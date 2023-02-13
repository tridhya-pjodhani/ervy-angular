import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core/api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public currentCreateUser;
  public onCurrentCreateUserChange: BehaviorSubject<any>;

  constructor(private _baseApiService: BaseApiService) {
    this.onCurrentCreateUserChange = new BehaviorSubject({});
  }

  getUsersList(params: any = {}): Observable<any>{
    const filterParams = {}

    for(let param in params){
      if(params[param] !== undefined){
        filterParams[param] = params[param]
      }
    }
    return this._baseApiService.makeRequest('GET','users/users-list',filterParams);
  }

  getAdminList(params: any = {}): Observable<any>{
    const filterParams = {}
    for(let param in params){
      if(params[param] !== undefined){
        filterParams[param] = params[param]
      }
    }
    return this._baseApiService.makeRequest('GET','admin/admin-list', filterParams);
  }

  deleteAdmin(adminId : any): Observable<any>{
    return this._baseApiService.makeRequest('PUT','admin/deleteAdmin/' + adminId);
  }

  createNewUser(postData: any){
    return this._baseApiService.makeRequest('POST','admin/create-admin', postData);
  }

  updateUser(postData: any, adminId: any){
    return this._baseApiService.makeRequest('PUT','admin/editAdmin/'+ adminId, postData);
  }

  observerEvent(){
    this.currentCreateUser = {};
    this.onCurrentCreateUserChange.next(this.currentCreateUser);
  }
}
