import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Username is required
      password: ['', Validators.required]  // Password is required
    });
  }

  ngOnInit() {
    // Additional initialization if needed
  }

  onSubmit() {
    console.log('onSubmit',this.loginForm.value)
    if (this.loginForm.valid) {
      // const username = this.loginForm.get('username').value;
      // const password = this.loginForm.get('password').value;

      // You can handle form submission logic here, e.g., send data to a server
    }
  }
}
