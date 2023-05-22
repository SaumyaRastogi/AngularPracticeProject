import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/Services/DataManagement/data-management.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css'],
})
export class RegisterUserFormComponent implements OnInit {
  registrationForm!: FormGroup;
  skills: string[] = ['HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Vue'];
  selectedSkills: string[] = [];
  constructor(
    private fb: FormBuilder,
    private dataService: DataManagementService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        role: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', Validators.required],
        skills: this.fb.group({
          HTML: ['false'],
          CSS: [false],
          JavaScript: [false],
          Angular: [false],
          React: [false],
          Vue: [false],
        }),
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
    this.registrationForm.get('skills')?.valueChanges.subscribe((val) => {
      this.selectedSkills = Object.keys(val).filter((key) => val[key]);
      this.skills = this.selectedSkills;
    });
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.router.navigate(['home/login']);
      console.log(this.registrationForm.value);
      this.registrationForm.value.skills = this.selectedSkills;
      let user = this.registrationForm.value;
      if(user.role == "admin")
      {
        user.isAdmin = true;
      }
      else
      {
        user.isAdmin = false;
      }
      this.dataService.addUser(user);

    }
  }
}
