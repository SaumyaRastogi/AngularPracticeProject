import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthgaurdGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('auth gaurd called', route.data['role']);
    let info= JSON.parse(localStorage.getItem('loginInfo') || '{}');
    if (route.data['role'] == 'admin') {
      console.log(
        'localStorage.getItem("isAdmin")  != "true"',
        info.isAdmin
      );
      
      if (info.isAdmin != 'true') {
        console.log('auth failed!!');
        this.router.navigate(["/home/login"]);
        return false;
      }
    }
    let expireTime = parseInt(this.auth.isLoggedIn());
    console.log('currenttime and expireTime', Date.now(), expireTime);
    if (expireTime < Date.now()) {
      console.log("token expired !!!!!")
      localStorage.clear();
      this.router.navigate(["/home/login"]);
      return false;
    }
    return true;
  }
}
