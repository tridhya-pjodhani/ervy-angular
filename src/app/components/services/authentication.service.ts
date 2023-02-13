import { JwtService } from './../../core/services/jwt.service';
import { LoginUserModel } from './../models/login-user.model';
import { RegisterUserModel } from './../models/register-user.model';
import { ForgotPasswordModel } from './../models/forgot-password.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { BaseApiService } from 'src/app/core/api/base-api.service';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _baseApiService: BaseApiService, private _jwtService: JwtService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.getActiveUser();
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(postData: LoginUserModel) {
    return this._baseApiService.makeRequest('POST','users/login', postData).pipe(
      map((user: any) => {
        if(!!user.status && !!user.data){
          user.data = {...user.data, role: user.data.user_type == 1 ? 'Admin' : 'Client'};
          this._jwtService.setLocalStore('currentUser',user.data);
          this._jwtService.setLocalStore('auth_token',user.data?.auth_toekn);
          // notify
          this.currentUserSubject.next(user.data);                  }
        return user;
      })
    );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    this._jwtService.clearStorage();
    // notify
    this.currentUserSubject.next(null);
  }

  getAuthStatus(): boolean {
    if(this._jwtService.getLocalStore('currentUser')){
      return true;
    } else {
      return false;
    }
  }
  

  getActiveUser(){
    let currentUser: User;
    if(this.getAuthStatus()){
      currentUser = this._jwtService.getLocalStore('currentUser');
    }
    return currentUser;
  }

  registerUser(postData: RegisterUserModel){
    return this._baseApiService.makeRequest('POST','users/signup', postData);
  }

  forgotPassword(forgotData: ForgotPasswordModel){
    return this._baseApiService.makeRequest('POST','users/forgot-password', forgotData);
  }
}
