import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from '../../Services/DataManagement/data-management.service';
import { Users } from 'src/app/Models/UserData';
import { Observable } from 'rxjs';
import { CurrentUserService } from 'src/app/Services/CurrenrUser/current-user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  registrationForm!: FormGroup;
  currentUser: Users;
  updatedUser: Users;
  userEmail: string;
  updateData: {};
  user$: Observable<Users>;
  role: string;
  skills:string[];
  selectedSkills: string[] = [];
  roles: string[] = ['Admin', 'User'];
  skillsList: string[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'Angular',
    'React',
    'Vue',
  ];

  constructor(
    public dataService: DataManagementService,
    private fb: FormBuilder,
    private router: Router,
    private currentUserService : CurrentUserService
  ) {
    let state = this.router.getCurrentNavigation()?.extras.state as {
      email: string;
    };
    this.userEmail = state.email;
  }

  ngOnInit(){
    let user$ = this.dataService.findCurrentUser();
    user$.subscribe((data) => {
      this.currentUser = data;
      this.registrationForm = this.fb.group({
        role: [this.currentUser.role],
        userName: this.currentUser.userName,
        email: this.currentUser.email,
        contact: this.currentUser.contact,
        skills: this.fb.group({
          HTML : this.currentUser.skills?.includes('HTML'), 
          CSS : this.currentUser.skills?.includes('CSS'),
          JavaScript : this.currentUser.skills?.includes('JavaScript'),
          Angular : this.currentUser.skills?.includes('Angular'),
          React: this.currentUser.skills?.includes('React'),
          Vue: this.currentUser.skills?.includes('Vue'),
        }) 
      });

      this.registrationForm.get('role')?.disable();
      this.registrationForm.get('email')?.disable();
      console.log('registration form', this.registrationForm);
      if(this.registrationForm.get('skills')?.valueChanges){
        this.registrationForm.get('skills')?.valueChanges.subscribe((val) => {
          this.selectedSkills = Object.keys(val).filter((key) => val[key]);
          this.skills = this.selectedSkills;
        });
      }
      else{
        console.log("selectedskillsinelse", this.selectedSkills)
      }
     
    });

  }

  updateUser() {

    this.updateData = {
      email: this.currentUser.email,
      userName:this.registrationForm.value.userName,
      isAdmin: this.currentUser.isAdmin,
      contact: this.registrationForm.value.contact,
      skills: this.selectedSkills.length == 0 ? undefined: this.selectedSkills,
      role: this.currentUser.role,
    };

    
    let updatedUser$ = this.dataService.updateUser(this.updateData);
    updatedUser$.subscribe((data) => {
      this.updatedUser = data;
      this.currentUserService.currentUser.next(this.updatedUser)
      this.router.navigate(['user/userDash/profile'], {
        state: { email: this.updatedUser.email },
      });
    });    
  }
}
