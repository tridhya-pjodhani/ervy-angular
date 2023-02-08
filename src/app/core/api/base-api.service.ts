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
    
    @BlockUI() blockUI: NgBlockUI;

    protected headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(protected http: HttpClient, private _toasterService: ToastrService, private _jwtService: JwtService) {}

    public makeRequest<T>(method: Methods, endpoint: any, params?: any, responseType?: 'json', headers?: HttpHeaders): Observable<T> {
        const urlParams = this.getUrlParams(params, method);
        const url = API_LINK_URL +`${endpoint}${urlParams}`;

        const options = {
            body: params,
            headers: headers || this.headers,
            responseType
        };

        return new Observable<T>(subscriber => {
            this.blockUI.start('Loading...');
            this.http.request<T>(method, url, options).pipe(
                catchError(this.showHttpError())
            ).subscribe((res: any) => {
                console.log('res of ' + endpoint + ' API >>' , res)
                this.showToaster(res, method);
                this.blockUI.stop();
                subscriber.next(res);
                subscriber.complete();
            },
            error => {
                console.log('error :>> ', error);
                // this.customErrorHandler(error);
                this.blockUI.stop();
                subscriber.error(error);
            });

        })
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
        if(response == undefined || response == null || method == 'GET') return;
        
        const successMsg = !!response.message ? response.message : 'Success';
        if(response?.status == 1){
            this._toasterService.success('',successMsg, { toastClass: 'toast ngx-toastr', closeButton: true })
        }
        if(response?.status == 0 ){
            this._toasterService.error('', response.message, { toastClass: 'toast ngx-toastr', closeButton: true })
        }
    }

    private customErrorHandler(error: any){
        const err = !!error ? error : 'Something went wrong';
        this._toasterService.error('',error, { toastClass: 'toast ngx-toastr', closeButton: true });
    }

    private showHttpError(){
        return (error: HttpErrorResponse | any): Observable<any> => {
            if( error == 'Unauthorized, please login.'){
                this._jwtService.clearStorage();
            }
            this.blockUI.stop();
            return throwError(error);
        }
      }
}


