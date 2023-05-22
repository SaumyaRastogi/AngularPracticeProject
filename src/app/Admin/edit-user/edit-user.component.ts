import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from '../../Services/DataManagement/data-management.service';
import { Users } from 'src/app/Models/UserData';
import { Observable } from 'rxjs';
import { CurrentUserService } from 'src/app/Services/CurrenrUser/current-user.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit{
  registrationForm!: FormGroup;
  currentUser : Users
  updatedUser : Users
  loggedInUser : Users
  userEmail: string;
  updateData: {};
  user$: Observable<Users>;
  role: string;
  skills:string[];
  selectedSkills: string[] = [];
  roles : string[] = ["Admin", "User"]
  skillsList: string[] = ['HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Vue',];

  constructor(
    public dataService: DataManagementService,
    private fb: FormBuilder,
    private router: Router,
    private currentUserService : CurrentUserService
  ) {
    let state = this.router.getCurrentNavigation()?.extras.state as {
      email: string;
    };

    console.log("Email from state",state.email)
    
    if(!state)
    {
      this.router.navigate(['admin/adminDash/list']);
    }
    this.userEmail = state.email;
  }

  ngOnInit() {
    let user$ = this.dataService.findUserByEmail(this.userEmail);
    user$.subscribe((data)=>{
      this.currentUser = data;
      console.log("current user from init",this.currentUser.skills?.includes('HTML'))
      this.registrationForm = this.fb.group({
        role: [this.currentUser.role],
        userName: this.currentUser.userName,
        email:this.currentUser.email,
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
      this.registrationForm.get("role")?.disable();
      this.registrationForm.get("email")?.disable();
      console.log("registration form",this.registrationForm );
      
      if(this.registrationForm.get('skills')?.valueChanges){
        this.registrationForm.get('skills')?.valueChanges.subscribe((val) => {
          this.selectedSkills = Object.keys(val).filter((key) => val[key]);
          this.skills = this.selectedSkills;
        });
      }
    });
  }

  ngOnChanges(change : SimpleChange){

  }

  updateUser() {
    this.currentUserService.currentUser.subscribe((data)=>{
          this.loggedInUser = data
    })

    this.updateData = {
      email: this.currentUser.email,
      userName:this.registrationForm.value.userName,
      isAdmin: this.currentUser.isAdmin,
      contact: this.registrationForm.value.contact,
      skills: this.selectedSkills.length==0 ? undefined: this.selectedSkills,
      role: this.currentUser.role,
    };

    
    let updatedUser$ = this.dataService.updateUser(this.updateData);
    updatedUser$.subscribe((data) => {
      this.updatedUser = data;
      if(this.loggedInUser.email == this.updatedUser.email ) {
        this.currentUserService.currentUser.next(this.updatedUser)
      }
      this.router.navigate(['admin/adminDash/list'], {
        state: { email: this.updatedUser.email },
      });
    });
  }
}
