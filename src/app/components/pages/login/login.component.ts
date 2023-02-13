import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ROLE } from 'src/app/API-URL/contants';
import { AuthenticationService, UserService } from 'src/app/auth/service';
import { LoginUserModel } from '../../models/login-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = "";
  public passwordTextType: boolean;
  public roles = ROLE;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService) {
      if (this._authenticationService.currentUserValue) {
        this._router.navigate(["/"]);
      }
  
      this._unsubscribeAll = new Subject();
     }


     get f() {
      return this.loginForm.controls;
    }

    togglePasswordTextType() {
      this.passwordTextType = !this.passwordTextType;
    }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      user_type: [2, [Validators.required]],
      platform_os: [1]
    });

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    this.loginForm.value.user_type = 2;
    // stop here if form is invalid

    if (this.loginForm.invalid) {     
      return;
    }

    
    // Login
    this.loading = true;
    this._authenticationService
      .login(this.loginForm.value as LoginUserModel)
      .pipe(first())
      .subscribe(
        (data) => {
          this._router.navigate(['/']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
