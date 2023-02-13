import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { API_LINK_URL } from 'src/app/API-URL/contants';

@Injectable({
  providedIn: "root",
})
export class SliderManagementService {
  constructor(private _baseApiService: BaseApiService, private _http: HttpClient, private _toasterService: ToastrService) {}

  getAllSlider(params: any = {}): Observable<any> {
    return this._baseApiService.makeRequest(
      "GET",
      "slider/get-slider",
      params
    );
  }

  getSingleSlider(sliderID: string): Observable<any> {
    return this._baseApiService.makeRequest(
      "GET",
      "slider/get-slider/"+
      sliderID
    );
  }

  addSlider(postData: any): Observable<any> {
    return this._http.post(API_LINK_URL+'slider/add-slider', postData).pipe(
      map((res: any) => {
        if(res?.status == 1){
          this._toasterService.success('',res.message, { toastClass: 'toast ngx-toastr', closeButton: true })
        }
        if(res?.status == 0 ){
          this._toasterService.error('',res.message, { toastClass: 'toast ngx-toastr', closeButton: true })
        }
        return res;
      })
    );
  }

  editSlider(postData: any, sliderID: string): Observable<any> {
    return this._http.put(API_LINK_URL+'slider/edit-slider/'+sliderID, postData).pipe(
      map((res: any) => {
        if(res?.status == 1){
          this._toasterService.success('',res.message, { toastClass: 'toast ngx-toastr', closeButton: true })
        }
        if(res?.status == 0 ){
          this._toasterService.error('',res.message, { toastClass: 'toast ngx-toastr', closeButton: true })
        }
        return res;
      })
    );
  }

  deleteSlider(postData: any): Observable<any> {
    return this._baseApiService.makeRequest(
      "DELETE",
      "slider/delete-slider/"+
      postData
    );
  }
}
