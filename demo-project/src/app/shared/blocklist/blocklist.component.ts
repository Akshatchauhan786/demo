import { Component,OnInit } from '@angular/core';
import { event } from 'jquery';
import { CommanService } from 'src/app/shared/comman.service';
import { NgxUiLoaderService } from "ngx-ui-loader";




@Component({
  selector: 'app-blocklist',
  templateUrl: './blocklist.component.html',
  styleUrls: ['./blocklist.component.css']
})
export class BlocklistComponent   {


  
  displayModal: boolean = false;
  displayBasic: boolean = false;
  columns: any[] = [{ title: 'S.No', id: 'sno' },
  { title: 'Contact Name ', id: 'contacts_name' },
  { title: 'Mobile Number', id: 'contacts_number' },
  { title: 'City', id: 'City_Name' },
 
  { title: 'Action', id: 'action' }]


  
  // for add city name in city master
  value1: any;
  cities:any;
  userdetails:any
  allblockdata:any[] = [];

  // for add city name in city master


  // displayModal: boolean=false;

  // displayBasic: boolean=false;

  showModalDialog() {
    this.displayModal = true;
}


showBasicDialog() {
  this.displayBasic = true;
// console.log('aman');

  
}


constructor(public comman: CommanService ,private ngxService:NgxUiLoaderService) { }

ngOnInit(): void {

  


  $('#blocklist').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
  });

  




this.userdetails = JSON.parse(localStorage.getItem("userdetails"))
  console.log(this.userdetails['Client_Id'], 'user');
  this.getblock_data()

  // this.changeStatusContact(event)


}





getblock_data(){
  this.ngxService.startLoader('defLoader'); 

  

  this.comman.getBlocklsit( this.userdetails['Client_Id']).subscribe((data: any) => {
    if (data) {
      this.allblockdata = JSON.parse(data);
      console.log(this.allblockdata,'------------------------------------');
    }
  });
  this.ngxService.stopLoader('defLoader');


}







changeStatusBlock(event: any) {
  let blocklist ;
  if(event.blocklist == 1 ){
    blocklist = 0;
  }else{
    blocklist = 1;
  }
  console.log(event[0].cont_id, blocklist , "contid And blocked cont");
  console.log( event[0].client_id , "client id");
  
//  var clientID = this.userdetials.Client_Id;
  this.comman.statusChangeContact(event[0].cont_id , blocklist ,this.userdetails['Client_Id']).subscribe((data: any) => {
    console.log(data , "=== response");
    if (data) {

      this.getblock_data()
      console.log("Change Status of Contact successfully");
    }
    
  });
}



// changeStatusUser(event: any) {
//   let Status ;
//   if(event.Status == 'A' ){
//     Status = 'R';
//   }else{
//     Status = 'A';
//   }
//   console.log(event.Id , Status);

//   this.comman.statusChangeUser(event.Id , Status).subscribe((data: any) => {
//     console.log(data);
//     if (data) {
//       console.log("Change Status of User successfully");
//     }
   
//   });
// }

}
