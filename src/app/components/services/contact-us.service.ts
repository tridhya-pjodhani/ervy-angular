import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseApiService } from './../../core/api/base-api.service';
import { Injectable } from '@angular/core';
import { API_LINK_URL } from 'src/app/API-URL/contants';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private baseApiService: BaseApiService, private _http: HttpClient) { }

  getContactList(params: any = {}){
    const filterParams = {}
    for(let param in params){
      if(params[param] !== undefined){
        filterParams[param] = params[param]
      }
    }
    return this.baseApiService.makeRequest('GET','contact-us/list', filterParams);
  }

  // Not use req goes to request payload
  // addContactList(postData: any = {}){
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data , application/x-www-form-urlencoded'
  //   },
  //   );
  //   return this.baseApiService.makeRequest('POST','contact-us/add',postData,'json',headers);
  // }

  addContactList(formData: any){
    return this._http.post(API_LINK_URL+'contact-us/add', formData);
  }

  deleteContactUS(id: any){
    return this.baseApiService.makeRequest('DELETE','contact-us/' + id);
  }

}