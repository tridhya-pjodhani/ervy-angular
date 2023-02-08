import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { User } from "app/auth/models";
import { AuthenticationService } from "app/auth/service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser: User = this._authenticationService.getActiveUser();
    if (currentUser) {
      if (currentUser.user_type == 1) {
        return true;
      } else {
        this._router.navigate(["dashboard"]);
        return false;
      }
    } else {
      this._router.navigate(["/auth/login"]);
      return false;
    }
  }
}
