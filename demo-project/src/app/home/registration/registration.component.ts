import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
// import { CommanserviceService } from 'src/app/commanservice.service';
import {Message,MessageService} from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import * as CryptoJS from 'crypto-js';
import { NgxUiLoaderService } from "ngx-ui-loader";



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationuser: FormGroup;

  


  constructor(public messageservice: MessageService, public userservice:UserService, private route:Router,private ngxService:NgxUiLoaderService
    ) { }

  ngOnInit(): void {
    this.createForm()
  }
 createForm(){
  this.registrationuser = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl(''),
    PhoneNo: new FormControl(''),
    EmailAddress: new FormControl('',[Validators.email, Validators.required]),
    Password: new FormControl('',Validators.required),
    confirm_password: new FormControl('',Validators.required),
    CompanyName: new FormControl('',Validators.required),
    CompanyWebsite: new FormControl('',Validators.required),
    CompanyLocation: new FormControl('',Validators.required),
    Country: new FormControl('India',Validators.required),
    Designation: new FormControl('',Validators.required),
    BusinessName: new FormControl('',Validators.required),
    TermsConditions: new FormControl('',Validators.required),
  });
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


  submit_registration_user(){

    console.log(this.registrationuser.value);
    if(this.registrationuser.valid){

   
       if(this.registrationuser.controls['Password'].value == this.registrationuser.controls['confirm_password'].value){
         // console.log('valid');


              
        const secretKey = 'DNPL@INDIA'


        var myey = this.ComputeSha256Hash(this.registrationuser.value.Password)
        var secret = this.ComputeSha256Hash(secretKey);

        var Password = secret +myey;
        console.log(Password);

        this.registrationuser.patchValue({Password:Password})

        this.ngxService.startLoader('defLoader'); 

        



   
         this.userservice.submit_registration_user(this.registrationuser.value).subscribe((data:any)=>{  
          console.log(data);
           if(data){   
            
            
         this.messageservice.add({severity:'success', summary:'Success', detail:'Thank you for registering with Botin Pro. Your application is underprocess. Kindly wait for the confirmation.'});
            
             setTimeout(() => {
              this.route.navigate(['login'])
            }, 2000);
           }


       })
       this.ngxService.stopLoader('defLoader');

   
       }
       else{
         this.messageservice.add({severity:'error', summary: 'Error', detail: 'Password Does Not Match'});
         this.registrationuser.reset();
        }
      }
      else{
      
      this.messageservice.add({severity:'error', summary: 'Warning', detail: 'Invalid details'});
      console.log('invalid');
      
    }

     



  }

}
