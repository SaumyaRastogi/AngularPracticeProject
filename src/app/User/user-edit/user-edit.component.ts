import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from '../../Services/DataManagement/data-management.service';
import { Users } from 'src/app/Models/UserData';
import { Observable } from 'rxjs';

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
    private router: Router
  ) {
    let state = this.router.getCurrentNavigation()?.extras.state as {
      email: string;
    };
    if (!state) {
      this.router.navigate(['admin/adminDash/list']);
    }
    this.userEmail = state.email;
  }

  // ngOnInit() {
    
  // }

  ngOnInit(){
    let user$ = this.dataService.findCurrentUser();
    user$.subscribe((data) => {
      console.log('user data in user edit form', data);
      this.currentUser = data;

     console.log(this.currentUser.skills[0])
     console.log(this.currentUser.skills[1])
     console.log(this.currentUser.skills[2])
     console.log(this.currentUser.skills[3])
     console.log(this.currentUser.skills[4])
     console.log(this.currentUser.skills[5])
     console.log("skils check",this.currentUser.skills?.includes('Vue'))
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

      skills: this.fb.group({
        HTML: ['false'],
        CSS: [false],
        JavaScript: [false],
        Angular: [false],
        React: [false],
        Vue: [false],
      }),

      this.registrationForm.get('role')?.disable();
      this.registrationForm.get('email')?.disable();
      console.log('registration form', this.registrationForm);
      this.registrationForm.get('skills')?.valueChanges.subscribe((val) => {
        this.selectedSkills = Object.keys(val).filter((key) => val[key]);
        this.skills = this.selectedSkills;
      });
    });

  }

  updateUser() {
    
    this.updateData = {
      
      email: this.currentUser.email,
      userName:this.registrationForm.value.userName,
      isAdmin: this.currentUser.isAdmin,
      contact: this.registrationForm.value.contact,
      skills: this.selectedSkills,
      role: this.currentUser.role,
    };
    console.log("All slecetdskils in update user",this.selectedSkills)
    console.log("skills in form", this.registrationForm.value.skills)
    let updatedUser$ = this.dataService.updateUser(this.updateData);
    updatedUser$.subscribe((data) => {
      console.log('updated user data', data);
      this.updatedUser = data;
    });
    this.router.navigate(['user/userDash/profile'], {
      state: { email: this.updatedUser.email },
    });
    
  }
}
