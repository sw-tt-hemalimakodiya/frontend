import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authServices: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'username': ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]/)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]/)]],
    })
  }

  public hasFormError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  getElements(controlName: string) {
    return this.registerForm.get(controlName);
  }

  register() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let formData = this.registerForm.value
    this.authServices.register(formData, (response : any) => {
      if (response.status == 200 && !response.hasOwnProperty('error')) {
        this.authServices.SetSelectedUserProfile(JSON.stringify(response));
        this.toastr.success('User Registered Successfully');
        this.registerForm.reset();
        this.router.navigate(['/']);
      } else if (response.hasOwnProperty('error')) {
        this.toastr.error('SignUp.user already exists');
      }
    })
  }
}
