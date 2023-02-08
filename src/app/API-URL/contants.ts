import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
export const API_VERSION = 'v1/'

export const API_LINK_URL = environment.apiUrl + '/' + API_VERSION;
export const ROLE = [
  {
    name: 'Admin',
    value: 1
  },
  {
    name: 'User',
    value: 2
  }
]

export const PER_PAGE_LIMIT = [5,10,15];
export const LANGUAGELIST = ['en', 'in'];

@Injectable()
export class Constants {
  constructor() { }
}