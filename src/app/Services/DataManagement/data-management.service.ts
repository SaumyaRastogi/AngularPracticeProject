import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Users } from 'src/app/Models/UserData';
import { usersData } from 'src/constants/const-data';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  users: Users[];

  //user:any[];
  constructor() {}

  Init() {
    // return new Promise<void>((resolve, reject) => {
    //   console.log('AppInitService.init() called', usersData);
    //   this.users = usersData.user;
    //   resolve();
    // });
    return new Observable((subscriber) => {
      
      console.log('AppInitService.init() called coming from observable', usersData);
      this.users = usersData.user;
      subscriber.complete();      

    });
  }

  addUser(userEntered: Users) {
    if (userEntered.role == 'admin') {
      userEntered.isAdmin == true;
    } else {
      userEntered.isAdmin = false;
    }
    this.users.push(userEntered);

    this.users.forEach((user) => {
      console.log(user);
    });
  }

  findUserByEmail(email: string) {
    let retUser: Users = {
      email: 'null',
      userName: 'null',
      password: 'null',
      isAdmin: false,
      contact: 'null',
      skills: [],
      role: '',
    };
    console.log("yahain call nahi ho raghi hai pata nahi kyuuu");
    this.users.forEach((user) => {
      if (user.email == email) {
        retUser = user;
        localStorage.setItem('currentUserInfo', JSON.stringify(retUser))
      }
    });

    return retUser;
  }

  updateUser(userdeatails: Users) {
    let retUser: Users = {
      email: 'null',
      userName: 'null',
      password: 'null',
      isAdmin: false,
      contact: 'null',
      skills: [],
      role: '',
    };
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email == userdeatails.email) {
        this.users[i] = { ...this.users[i], ...userdeatails };
        return this.users[i];
      }
    }
    return retUser;
  }
}
