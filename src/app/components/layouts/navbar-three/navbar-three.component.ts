import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar-three',
  templateUrl: './navbar-three.component.html',
  styleUrls: ['./navbar-three.component.scss']
})
export class NavbarThreeComponent implements OnInit {

  isLogin: boolean = false;

  constructor(private _authenticationService: AuthenticationService) { 
    if (this._authenticationService.currentUserValue) {
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
  }

  logout(){
    this._authenticationService.logout();
    this.isLogin = this._authenticationService.getAuthStatus();
  }

}
