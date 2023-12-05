import { Component, OnInit } from '@angular/core';
import { CommanService } from 'src/app/shared/comman.service';
import { NgxUiLoaderService } from "ngx-ui-loader";



@Component({
  selector: 'app-approvallist',
  templateUrl: './approvallist.component.html',
  styleUrls: ['./approvallist.component.css']
})
export class ApprovallistComponent implements OnInit {

  
  displayModal: boolean = false;
  displayBasic: boolean = false;
  columns: any[] = [{ title: 'S.No', id: 'sno' },
  { title: 'Company Name', id: 'Company_Name' },
  { title: 'Name', id: 'Name' },
  { title: 'Email', id: 'Email_Address' },
  { title: 'Mobile', id: 'Phone_no' },
  { title: 'Location', id: 'Location' },
  { title: 'Status', id: 'Status' },
  { title: 'User', id: 'user_count' },
  { title: 'Action', id: 'action' }]

  approval_list:any[] = [];

  userdetials:any;
  Client_Id:any

approveddata: any[] = [];

  
  

  


  constructor(public comman: CommanService,private ngxService:NgxUiLoaderService
    ) { }



  ngOnInit(): void {

    
    this.get_approvallist();

    
  }


  get_approvallist(){
    this.ngxService.startLoader('defLoader'); 


    this.comman.getapproval_listApi().subscribe((data: any) => {
      if (data) {
        this.approval_list = JSON.parse(data);

       

      }
    });
    this.ngxService.stopLoader('defLoader');


  }




  changeStatusApproval(event) {
    console.log(event, 'event value');
    
    

    this.comman.approvalclient_api(event[0].Client_Id, event[1]).subscribe((data: any) => {
      if (data) {
        this.approveddata = JSON.parse(data);
        console.log(this.approveddata);
      }
      this.get_approvallist()
    });
   
    
  }
  
  
 
  
  


}

