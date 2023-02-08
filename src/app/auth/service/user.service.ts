import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { BaseApiService } from 'app/core/api/base-api.service';

@Injectable({ providedIn: 'root' })
export class UserService{
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient, private _baseApiService: BaseApiService) {}

  /**
   * Get all users
   */
  getAll() {
    return this._http.get<User[]>(`${environment.apiUrl}/users`);
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

}
