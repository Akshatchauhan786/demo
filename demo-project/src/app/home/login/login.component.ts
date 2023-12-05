import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { NgxUiLoaderService } from "ngx-ui-loader";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private activatedRoute: ActivatedRoute, private userservice: UserService, public messageservice: MessageService, private route: Router, private ngxService: NgxUiLoaderService
  ) { }

  encryptPassword(password: string) {
    const secretKey = 'DNPL@INDIA'
    // const encrypted = CryptoTS.AES.encrypt(password, secretKey).toString();
    // console.log(encrypted);

    var mykey = this.ComputeSha256Hash(secretKey);



    var mypass = this.ComputeSha256Hash(password);
    return (mykey + mypass)



    // this.loginForm.patchValue({password:mykey+mypass})



  }

  ComputeSha256Hash(rawData: string): string {
    // Convert the raw data to a WordArray
    const data = CryptoJS.enc.Utf8.parse(rawData);

    // Compute the SHA-256 hash
    const hash = CryptoJS.SHA256(data);

    // Convert the hash to a Base64 string
    const base64Hash = CryptoJS.enc.Base64.stringify(hash);

    // Convert the Base64 string to a regular string
    let result = '';
    for (let i = 0; i < base64Hash.length; i++) {
      result += base64Hash[i]; // Alternatively, you can use result += base64Hash[i].toString('hex');
    }
    return result;
  }





  submit_login() {
    this.ngxService.startLoader('defLoader');


    // if(this.loginForm.valid){
    var passwordValue = this.encryptPassword(this.loginForm.value.password)
    // this.encryptPassword(this.loginForm.value.password)
    this.ngxService.stopLoader('defLoader');
    this.route.navigate(['share'])


    // this.userservice.authenticateUser(this.loginForm.value.userName, passwordValue).subscribe((data:any)=>{
    //   console.log(data, 'response data');
    //   var da = JSON.parse(data);
    //   console.log(da);


    //   if(da[0].auth == 'true'){
    //     console.log(da[1].Client_Id, 'client_id');

    //     this.userservice.get_my_license_details(da[1].Client_Id).subscribe((data:any)=>{
    //       var licensedetails = JSON.parse(data);
    //       var currentDate = new Date();
    //       var currentDateString = currentDate.getFullYear() + '-' + ("0" + (currentDate.getMonth()+1)).slice(-2) + '-' + ("0" + currentDate.getDate()).slice(-2)
    //       console.log(licensedetails[0].end_date.split('T')[0]);
    //       if(currentDateString> licensedetails[0].end_date.split('T')[0]){
    //         console.log('expired');
    //         this.messageservice.add({severity:'error', summary: 'Error', detail: 'The license for the current has expired. Kindly contact us.'});
    //       }
    //       else{
    console.log('active');
    // localStorage.setItem('userdetails', JSON.stringify(da[1]));
    localStorage.setItem('reload', '0');




    this.messageservice.add({ severity: 'sucess', summary: 'Successfull', detail: 'You Are Login' });

    this.route.navigate(['/share'])

  }
    //       })


    //     } 
    //     else {

    //       this.messageservice.add({severity:'error', summary: 'Error', detail: da[1].Mess});
    //     }  

    //   })

    // }


    // else{
    //   this.messageservice.add({severity:'error', summary: 'Error', detail: 'Email Id And Password Is Required'});
    // }

  


ngOnInit(): void {}


// checkLoginStatus(){
//   console.log('hit');
//   this.route.navigate(['share'])
// }



  // user session start hear 
  // submit_login(){

  // }
}
