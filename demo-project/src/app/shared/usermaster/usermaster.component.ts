import { Component } from '@angular/core';
// import "jquery";
// import "datatables.net";
import { CommanService } from '../comman.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import * as CryptoTS from 'crypto-ts';
import * as CryptoJS from 'crypto-js';
import { NgxUiLoaderService } from "ngx-ui-loader";








@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css']
})
export class UsermasterComponent {


  secretKey:any = 'MySecretKey';

  

  displayModal: boolean = false;
  displayBasic: boolean = false;
  columns: any[] = [{ title: 'S.No', id: 'sno' },
  { title: 'User Name', id: 'Name' },
  { title: 'Mobile', id: 'Phone_no' },
  { title: 'Email', id: 'Email_Address' },
  // { title: 'Role', id: 'Role' },
  { title: 'Action', id: 'action' }]

  users:any[] = [];
  userId: string;
  sub_up: string = "Submit";
  dialogLabel: string = "Add User ";
  pass: boolean = true;
  userdetails:any
  validNumber: string = "";
  emailCheck: string = "";

  edit:string='edit'
  add:any
  displayresetPasswordDialog: boolean;
  resetpassword: any;

constructor(public comman: CommanService,private messageService: MessageService,private ngxService:NgxUiLoaderService) { }

ngOnInit(): void {

  $('#usermaster').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
  });

  this.userdetails = JSON.parse(localStorage.getItem("userdetails"))
  // console.log(JSON.parse(clieNtDetails) as string);
  console.log(this.userdetails, 'user');
  this.getAllUsers();
  
}






showModalDialog() {
    this.displayModal = true;
}



showBasicDialog() {
  this.validNumber = "";
  this.emailCheck =  "";


  this.displayBasic = true;
  this.sub_up = "Submit";
this.dialogLabel = "Add User ";
this.pass = true;
  this.userForm.reset();
}


getAllUsers(){
  this.ngxService.startLoader('defLoader'); 


  this.comman.getAllUsers(this.userdetails.Client_Id).subscribe((data: any) => {
    if (data) {
      this.users = JSON.parse(data);
      // console.log(this.users);
      // console.log("All Users");
    }
  });
  this.ngxService.stopLoader('defLoader');

  

}

deleteUser(event: any) {
  console.log(event.Id , "deleting user having this ID");

  this.comman.deleteUser(event.Id).subscribe((data: any) => {
    console.log(data);
    if (data == 0) {
      console.log("User deleted successfully");
      this.getAllUsers();
    }
  });
}

changeStatusUser(event: any) {
  let Status ;
  if(event.Status == 'A' ){
    Status = 'R';
  }else{
    Status = 'A';
  }
  console.log(event.Id , Status);

  this.comman.statusChangeUser(event.Id , Status).subscribe((data: any) => {
    console.log(data);
    if (data) {
      console.log("Change Status of User successfully");
    }
    this.getAllUsers();
  });
}




userForm = new FormGroup({
  userID: new FormControl('',Validators.required),
  firstName: new FormControl(),
  lastName: new FormControl(),
  PhoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
  EmailAddress: new FormControl('',[ Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  CompanyName: new FormControl(),
  CompanyWebsite: new FormControl(),
  CompanyLocation: new FormControl(),
  Country: new FormControl(),
  Designation: new FormControl(),
  BusinessName: new FormControl(),
  ClientID: new FormControl(),
  Role: new FormControl(),
  Password: new FormControl('',[Validators.required]),
  TermsConditions: new FormControl(),
  Status: new FormControl()
});





resetPwdform=new FormGroup({
  resetPwd: new FormControl('', Validators.required),
  Client_id: new FormControl('', Validators.required),
  user_id:new FormControl('', Validators.required)


})




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
  

//this is reset password function
resetpwd(){



    console.log(
      this.resetpassword);
    

 

      this.resetPwdform.patchValue({Client_id: this.userdetails.Client_Id, user_id: this.userdetails.Id})



    // this.resetPwdform.patchValue({Client_id: this.userdetails.Client_Id, user_id: this.userdetails.Id})
    
    
    if (this.resetPwdform.valid){

      const secretKey = 'DNPL@INDIA'


       var myey = this.ComputeSha256Hash(this.resetPwdform.value.resetPwd)
        var secret = this.ComputeSha256Hash(secretKey);

        var password = secret +myey;
     console.log(this.resetpassword.Id);
     console.log(password);
     console.log(this.resetPwdform.value.user_id);


    this.comman.resetPasswordAPI(this.resetpassword.Id,this.resetPwdform.value.user_id,password).subscribe((data: any) => {

      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Reset Password Success '});

      // console.log("data",data);
      if (data) {
        console.log("Change Status of User successfully",data);
        this.getAllUsers();

        this.resetPwdform.reset();
        this.displayresetPasswordDialog = false
      }
    
  
    });
  
  }else{


    console.log( "------please enter the password");
  }


}

Resetpassword(Event:any,){

  this.displayresetPasswordDialog = true;
  this.resetpassword=Event
 
}


editUser(event: any) {
  this.validNumber = "";
  this.emailCheck =  "";

  this.sub_up = "Update";
  this.dialogLabel = "Update User ";
  this.pass = false;
  this.displayBasic = true;
 // this.userForm.patchValue(event)

 this.userForm.patchValue({firstName: event.First_Name , lastName: event.Last_Name ,userID: event.Id ,PhoneNo: event.Phone_no ,EmailAddress: event.Email_Address ,CompanyName: event.Company_Name ,CompanyWebsite: event.Company_Website ,CompanyLocation: event.Company_Location ,Country: event.Country ,Designation: event.Designation ,BusinessName: event.Business_Name ,ClientID: event.Client_Id ,Role: event.Role , Password: event.Password ,TermsConditions:event.Terms_Conditions})
  this.userId = event.Id;
  console.log(event, "events");
  console.log(this.userForm);
  
}


// decryptPassword(encryptedPassword: string) {
//   const secretKey = 'DNPL@INDIA'
//   const decrypted = CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8);
//   console.log(decrypted);
  
// }

submit(event: any) {
  
 
  if (this.userForm.controls['PhoneNo'].status == 'VALID' && this.userForm.controls['EmailAddress'].status == 'VALID') {


  this.userForm.patchValue({ BusinessName: this.userdetails.Business_Name , ClientID: this.userdetails.Client_Id , CompanyLocation: this.userdetails.Company_Location , CompanyName: this.userdetails.Company_Name , CompanyWebsite: this.userdetails.Company_Website , Country: this.userdetails.Country , Designation: this.userdetails.Designation ,  Role:this.userdetails.Role , TermsConditions: this.userdetails.Terms_Conditions  })

  
  this.displayBasic = false;
  console.log(this.userForm.value , "form values");
  

  let First_Name = this.userForm.controls['firstName'].value;
  let Phone_no = this.userForm.controls['PhoneNo'].value;
  let Email_Address = this.userForm.controls['EmailAddress'].value;

  // let pass_word = this.userForm.controls['Password'].value;

  const secretKey = 'DNPL@INDIA'


  var myey_reg = this.ComputeSha256Hash(this.userForm.value.Password)
  var secret_reg = this.ComputeSha256Hash(secretKey);

  var Password = secret_reg +myey_reg;


  this.userForm.patchValue({Password:Password})
  console.log('---------------------------------');
  console.log(Password);

  
  


  let userId = this.userForm.controls['userID'].value;

  console.log(First_Name , Phone_no , Email_Address);
  console.log(userId , "= user id");

  if (First_Name != '' && First_Name != null && Phone_no != '' && Phone_no != null && Email_Address != '' && Email_Address != null) {
    // this.encryptPassword(this.userForm.value.Password)
    if (userId) {
      this.comman.updateUser(this.userForm.value).subscribe((data: any) => {
        if(data){
          this.messageService.add({severity:'success', summary: 'Success', detail:'User  update  successfully '});

          console.log(data, "------User Updated");
        this.getAllUsers();
        this.userForm.reset()
        }else{
          
          console.log(data, "------Not Updated");
        }
      })
    } else {

      this.comman.submitUser(this.userForm.value).subscribe((data: any) => {
        if(data){
          console.log(data, "------User Registered");
          this.messageService.add({severity:'success', summary: 'Success', detail:'User  successfully '});


        this.getAllUsers();
        this.userForm.reset();
        }else{
          this.messageService.add({severity:'warn', summary: 'Warning', detail:'Enter the valid user name'});

          console.log(data, "------Not Registered");
        }
      })
    }
  }else{
    this.messageService.add({severity:'warn', summary: 'Warning', detail:'Enter the valid user name'});

    console.log("please Enter Users Name")
  }
}else{
  this.messageService.add({severity:'warn', summary: 'Warning', detail:'Enter the valid user name '});

  


}
}


}
