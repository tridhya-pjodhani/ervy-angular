import { RegisterUserModel } from './../../models/register-user.model';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';
import { MustMatch } from 'src/app/core/helper/password.validator';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  public passwordTextType: boolean;
  public showConfirmPassword: boolean;
  public registerForm: FormGroup;
  public submitted = false;
  public error: string = '';
  public loading = false;

  private _unsubscribeAll: Subject<any>;

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService, private router: Router) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]]
    },
    {
      validator: [MustMatch('password', 'confirm_password')]
    }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this._authenticationService.registerUser(this.registerForm.value as RegisterUserModel).pipe(first())
    .subscribe(
      (data: any) => {
        if(!!data.status){
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
