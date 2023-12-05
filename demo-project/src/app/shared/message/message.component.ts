import { Component } from '@angular/core';

import { CommanService } from '../comman.service';
import { NgxUiLoaderService } from "ngx-ui-loader";





@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  userdetails:any
  msgdata:any;


  
  // for add city name in city master
  value1: any;
  // for add city name in city master


  displayModal: boolean=false;

  displaymessage: boolean=false;

  showModalDialog() {
    this.displayModal = true;
}


showmessageDialog() {
  this.displaymessage = true;
// console.log('aman');

  
}


  constructor(public comman: CommanService,private ngxService:NgxUiLoaderService
    ) { }

  ngOnInit(): void {


    
    this.userdetails = JSON.parse(localStorage.getItem("userdetails"))



    console.log(this.userdetails.Client_Id);

    this.ngxService.startLoader('defLoader'); 



    this.comman.messagetemplateAPI(this.userdetails.Client_Id).subscribe((data: any) => {



      // console.log("data",data);
      if (data) {
        console.log("Change Status of User successfully",data);

        console.log(data);
        this.msgdata=JSON.parse(data)
        console.log(this.msgdata);
        
        
      }
      this.ngxService.stopLoader('defLoader');

    
  
    });
    
    

    
    

    
    



 
    
  }

  // messagetemplate(){

  // }

}
