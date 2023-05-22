import { Injectable } from '@angular/core';
import { DataManagementService } from '../DataManagement/data-management.service';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dataManagemnetService: DataManagementService,
    private http : HttpClient) {}
    loginDetails  :any

  loginInfo={
   email : "",
   expTime : "",
   userName : "",
   isAdmin : ""
  }

  isLoggedIn(): string {
    let info= JSON.parse(localStorage.getItem('loginInfo') || '{}');
    console.log("IsLoggedIn called with :", info);
    if (!info.expTime) {
      console.log(" 00000000000 ",info.expTime)
      return '0';
    }
    return '' + info.expTime;
  }

  async login(email: string, password: string) {
    const payload = {email : email, password:password}
    let response = await this.http.post("http://localhost:3000/login", payload).toPromise();
    this.loginDetails = response

    console.log("login details", this.loginDetails)
    // resposne$.subscribe((data) =>{
    //   console.log("Login data", data)
    //   this.loginDetails = data
    // })

   localStorage.setItem('authToken', this.loginDetails.token.toString());
   //console.log("from login token is", resposne.data.token);

    let user = this.loginDetails.user;
    if(user.role == "admin")
      user.isAdmin = true;
    else
      user.isAdmin = false;
    

    console.log("login user :",user);
    if (user) {
      let expTime = Date.now() + 360000000;
      this.loginInfo.expTime = expTime?.toString();
      this.loginInfo.email = user.email;
      this.loginInfo.userName = user.userName;
      this.loginInfo.isAdmin = user.isAdmin.toString();
      localStorage.setItem('loginInfo', JSON.stringify(this.loginInfo))
      console.log(JSON.stringify(this.loginInfo))
      // localStorage.setItem('email',user.email);
      // localStorage.setItem('expireTime', expTime?.toString());
      // localStorage.setItem('userName', user.userName);
      // localStorage.setItem('isAdmin', user.isAdmin.toString());
    }
    return user;
  }
}
