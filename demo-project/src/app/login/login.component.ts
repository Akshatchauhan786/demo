import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private loginService: UserService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // Additional initialization if needed
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.showInvalidCredentialsMessage();
    }
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private login() {
    this.loginService.login(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data, "data of login user");
        if (data.msg === "success") {
          this.router.navigate(['/home']);
        } else {
          this.showErrorMessage('Please Enter valid Email & Password');
        }
      },
      (error: any) => {
        this.showErrorMessage('Network error..!');
      }
    );
  }

  private showInvalidCredentialsMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Please Enter Email & Password'
    });
  }

  private showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
