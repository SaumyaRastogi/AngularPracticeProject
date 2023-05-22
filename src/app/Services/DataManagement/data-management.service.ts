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
  constructor(private http: HttpClient) {}

  Init() {
    return new Observable((subscriber) => {
      console.log(
        'AppInitService.init() called coming from observable',
        usersData
      );
      subscriber.complete();
    });
  }

  addUser(userEntered: Users): Observable<Users> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    if (userEntered.role == 'admin') {
      userEntered.isAdmin == true;
    } else {
      userEntered.isAdmin = false;
    }
    const addedUser$ = this.http.post<Users>(
      'http://localhost:3000/registerNewUser',
      userEntered,
      config
    );
    addedUser$.subscribe((data) => {
      console.log('addUser', data);
    });
    return addedUser$;
  }

  findUserByEmail(email: string): Observable<Users> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    const userByEmail$ = this.http.get<Users>(
      `http://localhost:3000/getUserByEmail/${email}`,
      config
    );
    userByEmail$.subscribe((data) => {
      console.log('findUserByEmail', data);
    });

    return userByEmail$;
  }

  findCurrentUser(): Observable<Users> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    const currentUser$ = this.http.get<Users>(
      'http://localhost:3000/currentUser',
      config
    );
    currentUser$.subscribe((data) => {
      console.log('findCurrentUser', data);
    });

    return currentUser$;
  }

  findAllUser(): Observable<Users[]> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    const allUser$ = this.http.get<Users[]>(
      'http://localhost:3000/getAllUsers',
      config
    );

    allUser$.subscribe((data) => {
      console.log('findAllUser', data);
    });
    return allUser$;
  }

  findUserByUserName(userName: string): Observable<Users> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };

    const userByUserName$ = this.http.post<Users>(
      'http://localhost:3000/user/name/',
      config
    );
    userByUserName$.subscribe((data) => {
      console.log('findUserByUserName', data);
    });
    return userByUserName$;
  }

  updateUser(userdetails: any) {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    };
    console.log("update user called ", userdetails)
    const updatedUser$ = this.http.post<Users>(
      'http://localhost:3000/updateUser',
      userdetails,
      config
    );
    updatedUser$.subscribe((data) => {
      console.log('Useradded', data);
    });
    return updatedUser$;
  }
}
