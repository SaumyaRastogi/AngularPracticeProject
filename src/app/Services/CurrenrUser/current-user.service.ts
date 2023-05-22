import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Users } from 'src/app/Models/UserData';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() {   
  }

  retUser: Users = {
    email: 'null',
    userName: '',
    password: 'null',
    isAdmin: false,
    contact: 'null',
    skills: [],
    role: '',
  };


  
  currentUser = new BehaviorSubject(this.retUser)
  

}
