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
  loginForm: FormGroup ;

  constructor(private fb: FormBuilder,private messageService: MessageService,private login: UserService,private route: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required]  
    });
  }

  ngOnInit() {
    // Additional initialization if needed
  }

   onSubmit() {
    if (this.loginForm.valid) {
      this.login.login(this.loginForm.value).subscribe((data: any) => {
        console.log(data , "data of login user");
        if (data.msg == "success") {
          this.route.navigate(["/home"]);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter valid Email & Password' });
        }
      }, (error: any) => {
        // console.log("internet =>", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network error..!' });
      })
    } else {
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Please Enter  Email & Password' });
    }
  }
}
