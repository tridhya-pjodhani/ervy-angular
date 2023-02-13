import { JwtService } from './../services/jwt.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LINK_URL } from '../../../app/API-URL/contants';
import { Observable, of, throwError } from 'rxjs';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

@Injectable({ providedIn: 'root' })
export class BaseApiService {
    protected headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(protected http: HttpClient, private toasterService: ToastrService, private jwtService: JwtService) {}

    public makeRequest<T>(method: Methods, endpoint: any, params?: any, responseType?: 'json', headers?: HttpHeaders): Observable<T> {
        const urlParams = this.getUrlParams(params, method);
        const url = API_LINK_URL + `${endpoint}${urlParams}`;

        const options = {
            body: params,
            headers: headers || this.headers,
            responseType
        };

        return new Observable<T>(subscriber => {
            // Spinner Start
            this.http.request<T>(method, url, options).pipe(
                catchError(this.showHttpError())
            ).subscribe((res: any) => {
                console.log('res of ' + endpoint + ' API >>' , res);
                this.showToaster(res, method);
                // Spinner Stop
                subscriber.next(res);
                subscriber.complete();
            },
            error => {
                console.log('error :>> ', error);
                // this.customErrorHandler(error);
                // Spinner Stop
                subscriber.error(error);
            });
        });
    }

    private getUrlParams(params: any, type: any): string {
        let urlParams = new HttpParams();
        if (type === 'GET') {
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    if (Array.isArray(params[key])) {
                        params[key].forEach((element: any) => {
                            urlParams = urlParams.append(key, element);
                        });
                    } else {
                        urlParams = urlParams.set(key, params[key]);
                    }
                }
            }
        }
        if (urlParams.toString() === '') {
            return urlParams.toString();
        }
        return '?' + urlParams.toString();
    }

    private showToaster(response: any, method: Methods){
        if (response === undefined || response == null || method === 'GET') { return; }

        const successMsg = !!response.message ? response.message : 'Success';
        if (response?.status === 1){
            this.toasterService.success('', successMsg);
        }
        if (response?.status === 0 ){
            this.toasterService.error('', response.message);
        }
    }

    private customErrorHandler(error: any){
        const err = !!error ? error : 'Something went wrong';
        this.toasterService.error('', error);
    }

    private showHttpError(){
        return (error: HttpErrorResponse | any): Observable<any> => {
            if ( error === 'Unauthorized, please login.'){
                this.jwtService.clearStorage();
            }
            // Spinner Stop
            return throwError(error);
        };
      }
}


