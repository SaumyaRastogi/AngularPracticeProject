import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Users } from 'src/app/Models/UserData';
import { usersData } from 'src/constants/const-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  users: Users[];
  //user:any[];
  constructor(private http: HttpClient) {}

  Init() {
    return new Observable((subscriber) => {
      console.log(
        'AppInitService.init() called coming from observable',
        usersData
      );
      //this.users = usersData.user;
      subscriber.complete();
    });
  }

  addUser(userEntered: Users): Observable<Users> {
    if (userEntered.role == 'admin') {
      userEntered.isAdmin == true;
    } else {
      userEntered.isAdmin = false;
    }
    const addedUser$ = this.http.post<Users>(
      'http://localhost:3000/registerNewUser',
      userEntered
    );
    addedUser$.subscribe((data) => {
      console.log('Useradded', data);
    });
    return addedUser$;
  }

  findUserByEmail(email: string): Observable<Users> {
    let retUser: Users = {
      email: 'null',
      userName: 'null',
      password: 'null',
      isAdmin: false,
      contact: 'null',
      skills: [],
      role: '',
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    // let users: any = await axios.get(`http://localhost:3000/getUserByEmail/${email}`,config);
    // if(users.data)
    // return users.data;
    // else
    // return retUser;

    const userByEmail$ = this.http.post<Users>(
      'http://localhost:3000/getUserByEmail/${email}',
      config
    );
    userByEmail$.subscribe((data) => {
      console.log('User by email', data);
    });

    return userByEmail$;
  }

  findCurrentUser(): Observable<Users> {
    let retUser: Users = {
      email: 'null',
      userName: 'null',
      password: 'null',
      isAdmin: false,
      contact: 'null',
      skills: [],
      role: '',
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    // let users: any = await axios.get(`http://localhost:3000/currentUser`,config);
    // if(users.data)
    // return users.data;
    // else
    // return retUser;

    const currentUser$ = this.http.post<Users>(
      'http://localhost:3000/currentUser',
      config
    );
    currentUser$.subscribe((data) => {
      console.log('User by email', data);
    });

    return currentUser$;
  }

  findAllUser(): Observable<Users> {
    let retUser: Users = {
      email: 'null',
      userName: 'null',
      password: 'null',
      isAdmin: false,
      contact: 'null',
      skills: [],
      role: '',
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    // let users: any = await axios.get(`http://localhost:3000/getAllUsers`,config);
    // if(users.data)
    // return users.data;
    // else
    // return retUser;

    const allUser$ = this.http.post<Users>(
      'http://localhost:3000/getAllUsers',
      config
    );
    allUser$.subscribe((data) => {
      console.log('Useradded', data);
    });
    return allUser$;
  }

  findUserByUserName(userName: string): Observable<Users> {
    let retUser: Users = {
      email: 'null',
      userName: 'null',
      password: 'null',
      isAdmin: false,
      contact: 'null',
      skills: [],
      role: '',
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    // let users : any = await axios.get(`http://localhost:3000/user/name/`,config);
    // if(users.data)
    // return users.data;
    // else
    // return retUser;

    const userByUserName$ = this.http.post<Users>(
      'http://localhost:3000/user/name/',
      config
    );
    userByUserName$.subscribe((data) => {
      console.log('Useradded', data);
    });
    return userByUserName$;
  }


  updateUser(userdetails: Users) {
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
      if (this.users[i].email == userdetails.email) {
        this.users[i] = { ...this.users[i], ...userdetails };
        return this.users[i];
      }
    }

    // return retUser;
    const updatedUser$ = this.http.post<Users>(
      'http://localhost:3000/registerNewUser',
      userdetails
    );
    updatedUser$.subscribe((data) => {
      console.log('Useradded', data);
    });
    return updatedUser$;
  }
}
