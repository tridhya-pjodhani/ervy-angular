import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {}

  setLocalStore(key: string, data: any) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	getLocalStore(key: string) {
		let data: any = '';
		if (!!key && localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== null) {
			let localData: any = localStorage.getItem(key);
			if (!!localData && localData !== 'undefined') {
				data = JSON.parse(localData);
			}
		}
		return data;
	}

	clearStorageFor(key: string) {
		return localStorage.removeItem(key);
	}

	clearStorage() {
		localStorage.clear();
	}

}
