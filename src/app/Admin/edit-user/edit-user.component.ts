import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from '../../Services/DataManagement/data-management.service';
import { Users } from 'src/app/Models/UserData';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit{
  registrationForm!: FormGroup;
  currentUser : Users
  updatedUser : Users
  userEmail: string;
  role: string;
  selectedSkills: string[] = [];
  roles : string[] = ["Admin", "User"]
  skillsList: string[] = ['HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Vue',];

  constructor(
    public dataService: DataManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    let state = this.router.getCurrentNavigation()?.extras.state as {
      email: string;
    };
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
      console.log("current user",this.currentUser,this.currentUser?.email, this.currentUser?.userName );
      this.registrationForm = this.fb.group({
        role: [this.currentUser.role],
        userName: this.currentUser.userName,
        email:this.currentUser.email,
        contact: this.currentUser.contact,
        skills: [this.currentUser?.skills]
      });
      this.registrationForm.get("role")?.disable();
      this.registrationForm.get("email")?.disable();
      console.log("registration form",this.registrationForm );
      this.registrationForm.value.skills.forEach((x : any)=> this.selectedSkills.push(x))
    })
    console.log(this.selectedSkills)
  }

  ngOnChanges(change : SimpleChange){

  }

  updateUser() {
      console.log()
      console.log(this.registrationForm.value);
      console.log(this.dataService.updateUser(this.registrationForm.value));
      // let info= JSON.parse(localStorage.getItem('loginInfo') || '{}')
      let updatedUser$ = this.dataService.updateUser(this.registrationForm.value)
      updatedUser$.subscribe((data)=>{
        console.log("updated user data", data)
        this.updatedUser = data
      })
      this.router.navigate(['admin/adminDash/list'], {
        state: { email: this.updatedUser.email },
      });
    }
  }

