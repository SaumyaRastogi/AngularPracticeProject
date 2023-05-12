import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from '../../Services/DataManagement/data-management.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  registrationForm!: FormGroup;
  userEmail: string;
  role: string;
  selectedSkills: string[] = [];
  skillsList: string[] = ['HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Vue',];

  constructor(
    public dataService: DataManagementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const state = JSON.parse(localStorage.getItem('loginInfo') || '{}')
    this.userEmail = state.email;
    console.log(this.userEmail);
  }

  ngOnInit() {
    let user = this.dataService.findUserByEmail(this.userEmail);
    let userData = JSON.parse(localStorage.getItem('currentUserInfo') || '{}');
    console.log("ye hai data",userData)
    this.role = user.role;
    this.registrationForm = this.fb.group({
      role: [userData?.role, Validators.required],
      userName: [userData?.userName, Validators.required],
      email: [userData?.email, [Validators.required, Validators.email]],
      contact: [userData?.contact, Validators.required],
      skills: [userData?.skills]
    });
    this.registrationForm.value.skills.forEach((x : any)=> this.selectedSkills.push(x))
    console.log(this.selectedSkills)
  }


  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }

  updateUser() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      console.log(this.dataService.updateUser(this.registrationForm.value));
      let info= JSON.parse(localStorage.getItem('loginInfo') || '{}')
      this.router.navigate(['user/userDash/profile'], {
        state: { email: info.email },
      });
    }
  }
}
