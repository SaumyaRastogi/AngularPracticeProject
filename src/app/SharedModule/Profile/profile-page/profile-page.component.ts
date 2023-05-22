import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from 'src/app/Models/UserData';
//import { DataService } from '@progress/kendo-angular-dropdowns/common/data.service';
import { DataManagementService } from 'src/app/Services/DataManagement/data-management.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  registrationForm!: FormGroup;
  currentUser$: Observable<Users>;
  currentUser: Users;
  skills: string[] = ['HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Vue'];
  userSkills: string[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'Angular',
    'React',
    'Vue',
  ];
  user: Users;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataManagementService
  ) {}

  async ngOnInit() {
    this.currentUser$ = await this.dataService.findCurrentUser();
    this.currentUser$.subscribe((data) => {
      console.log('Current user', data);
      this.currentUser = data;
    });
  }

  buildSkills() {
    const skillsArr = this.skills.map((skill) => {
      return this.fb.control(false);
    });
    return this.fb.array(skillsArr);
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }

  editUser() {
    let info = JSON.parse(localStorage.getItem('loginInfo') || '{}');
    this.router.navigate(['user/userDash/editProfile'], {
      state: { email: info.email },
    });
  }
}
