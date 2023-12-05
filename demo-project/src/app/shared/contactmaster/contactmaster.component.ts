import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

import "jquery";
import "datatables.net";
import { CommanService } from '../comman.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TemplateService } from 'src/app/services/template.service';

import { environment } from 'src/environments/environment';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";





@Component({
  selector: 'app-contactmaster',
  templateUrl: './contactmaster.component.html',
  styleUrls: ['./contactmaster.component.css']
})
export class ContactmasterComponent implements OnInit {

  displayModal: boolean = false;
  displayBasic: boolean = false;

  selectedContacts:number

  displayBasic2: boolean = false;

  columns: any[] = [
    { title: '', id: 'CheckBox' },
    { title: 'S.No', id: 'sno' },
  { title: 'Contact Name', id: 'contacts_name'},
  

  
  { title: 'Mobile', id: 'contacts_number' },
  { title: 'City', id: 'City_Name' },

  { title: 'Action', id: 'action' }]

  contactID: number;
  validNumber: string = "";
  contactsData: any[] = [];
  sub_up: string = "Submit";
  dialogLabel: string = "Add Contact ";

  filesData: any[] = [];
  fileArray: any[] = [];

  cities: [];


  title = 'XlsRead';
  file:File;
  arrayBuffer: any;
  filelist:any;

  userdetials:any;
  
  userdetails = JSON.parse(localStorage.getItem('userdetails'))
  Client_Id = this.userdetails.Client_Id

  name = "Angular";
  JSONData: any;
  text: any;

  countries: any[];
  filteredCity: any;



  allowedExt = ["csv"];

  constructor(private ngxService:NgxUiLoaderService,public comman: CommanService, private confirmationService: ConfirmationService, private messageService: MessageService,public templateservice: TemplateService,private router:Router) { }


  uploadedFiles: any[] = [];
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  ngOnInit(): void {


    // $('#contactmaster').DataTable({
    //   "paging": true,
    //   "lengthChange": true,
    //   "searching": true,
    //   "ordering": true,
    //   "info": true,
    //   "autoWidth": false,


    // this.template_document_baseurl = environment.documentUrl;

    this.getAllCities()
    // });
    console.log(this.Client_Id , "temp variable" );
    
    this.userdetails = JSON.parse(localStorage.getItem("userdetails"))

    console.log(this.userdetails);
    
    // console.log(JSON.parse(clieNtDetails) as string);
    
    this.getAllContacts();

    // this.rowvalue_select(event)

    


  }

  rowvalue_select(event){
    // console.log('dddh-----------------------------------------------------------');
    console.log(event);
    this.selectedContacts = event;

    console.log(this.selectedContacts,'value');

    
  }







  getAllContacts() {
    console.log('ss');
    this.ngxService.startLoader('defLoader'); 

    
    this.comman.getAllContacts(this.Client_Id).subscribe((data: any) => {
      if (data) {
        this.contactsData = JSON.parse(data);
        console.log(this.contactsData);
        console.log("All contacts");
      }
    });
    this.ngxService.stopLoader('defLoader');


  }
  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.validNumber = "";
    this.displayBasic = true;
    this.sub_up = "Submit";
    this.dialogLabel = "Add Contact ";
    this.ContactForm.reset();
  }


  showBasicDialog_template(){
    this.displayBasic2 = true;
    this.displayBasic2 = true;

    





  }

  get_tempdata(){

    this.router.navigate(['share/admin/templatesechudle'])

  }

  showBasicDialog2() {
    this.displayBasic2 = true;
    
}

  deleteContact(event: any) {
    console.log(event.cont_id, "deleting contact");
    this.comman.deleteContact(event.cont_id ,this.Client_Id ).subscribe((data: any) => {
      console.log(data);
      if (data == 0) {
        console.log("contact deleted successfully");
        this.getAllContacts();
      }
    });
  }

  changeStatusContact(event: any) {
    let blocked_contacts ;
    if(event.blocked_contacts == 1 ){
      blocked_contacts = 0;
    }else{
      blocked_contacts = 1;
    }
    console.log(event.cont_id, blocked_contacts , "contid And blocked cont");
    console.log( event.client_id , "client id");
    
   // var clientID = this.userdetials.Client_Id;
    this.comman.statusChangeContact(event.cont_id , blocked_contacts , this.Client_Id).subscribe((data: any) => {
      console.log(data , "=== response");
      if (data) {
        console.log("Change Status of Contact successfully");
      }
      this.getAllContacts();
    });
  }

  ContactForm = new FormGroup({
    cont_id: new FormControl(),
    contacts_name: new FormControl(),
    contacts_number: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
    email_id: new FormControl( '',[ Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    client_id: new FormControl(),
    upload: new FormControl(),
    Action: new FormControl(),
    Status:new FormControl('1'),
    city_id:new FormControl(''),

    City_Name:new FormControl(),



    
  });


  editContact(event: any) {
    this.validNumber = "";
    this.sub_up = "Update";
    this.dialogLabel = "Update Contact ";
    this.displayBasic = true;
    console.log(event,'event ');
    
    this.ContactForm.patchValue(event)
    console.log('event',event);

    // dropdown select value populate value

     this.filterCity({query:event.City_Name})


    var objcityname={city_id:event.City_Name,City_Name:event.City_Name}
    this.ContactForm.patchValue({City_Name:objcityname})
    this.contactID = event.Contact_Id;

    console.log(event.contacts_name, "contact to be edited");
  }



  submit(event: any) {
    if (this.ContactForm.controls['contacts_number'].status == 'VALID') {

      // this.displayBasic = false;

      let Contact_Name = this.ContactForm.controls['contacts_name'].value;
      let contactID = this.ContactForm.controls['cont_id'].value;
      let contactNo = this.ContactForm.controls['contacts_number'].value;
      let email = this.ContactForm.controls['email_id'].value;
      let City_Name=this.ContactForm.controls['City_Name'].value;


      if (Contact_Name != '' && Contact_Name != null) {
        // var clientID = this.userdetials.Client_Id;
        if (contactID) {

          this.comman.updateContact(Contact_Name, contactNo, contactID , email , this.Client_Id,City_Name.city_id).subscribe((data: any) => {
            if (data) {
              this.displayBasic=false;

              this.messageService.add({severity:'success', summary: 'success ', detail:'Contact update Successfully '});

              console.log(data, "------Contact Updated");
            } else {

              this.displayBasic = false;
              

              this.messageService.add({severity:'warn', summary: 'Warning', detail:'Contact not update'});


              console.log(data, "------Not Updated");
            }
            this.getAllContacts();
          })
        } else {
          
          this.comman.submitContactSingle(Contact_Name, contactNo , email, this.Client_Id,City_Name.city_id).subscribe((data: any) => {
            if (data) {
              console.log(data, "------Contact Registered");
              this.displayBasic=false;

              this.messageService.add({severity:'success', summary: 'Success', detail:'Contact submit successfully '});

            } else {
              console.log(data, "------Not Registered");
            }
            this.getAllContacts();
          })
        }
      } else {
      }
    }else{
      this.messageService.add({severity:'warn', summary: 'Warning', detail:' Enter contact name.'});

      // this.validNumber = "Enter 10 digit Mobile Number";
    }
  }

  uploadedFile(data:any){
    console.log(data);
    console.log(data.target);
    console.log(data.target.files);
    console.log(data.target.files[0]);

    let file1 = data.target.files[0];
    const file = file1
    const reader = new FileReader();
   // reader.onload = e => {this.fileArray = reader.result;console.log(this.fileArray);};
    reader.readAsDataURL(file);
  }


  addfile(event)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            this.filelist = [];    
         //   console.log(this.filelist) 
            
    
  }    
} 

// csvFile(input){
//   console.log(input);
  
//   const reader = new FileReader();
//   reader.onload = () => {
//     let text = reader.result;
//     console.log('CSV: ', (text as string).substring(0, 100) );
    
//     //convert text to json here
//     var json = this.csvJSON(text);
//   };
//   reader.readAsText(input.files[0]);

// }

csvJSON(csvText) {
  var lines = csvText.split(/\r\n/);
 
  var result = [];

  var headers = lines[0].split(",");
  console.log(headers);
  for (var i = 1; i < lines.length - 1; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    //console.log(currentline);
    
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  //console.log(JSON.stringify(result)); //JSON
  console.log(result);
 
  this.JSONData = JSON.stringify(result);

  var myobj = {CartItems: result ,client_id: this.Client_Id}
  console.log(myobj);
  console.log(JSON.stringify(myobj));
  
  console.log(this.Client_Id);
  



  this.comman.submitContact(myobj).subscribe((data: any) => {
    console.log("submit Service");
    
    if (data) {
      console.log(data, "------Contact Registered");
    } else {
      console.log(data, "------Not Registered");
    }
    this.getAllContacts();
  });
  
  // this.JSONData = JSON.stringify(result);
  // console.log(this.JSONData);
 
  // result["Client_Id"] = this.Client_Id;
  // this.JSONData = JSON.stringify(result);

  // console.log(result);
  // this.JSONData = JSON.stringify(result);
  
  // console.log(this.JSONData);
}

convertFile(e) {

  

  const reader = new FileReader();
  const file = e.target.files[0];
  console.log(file);
  

    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      let text = reader.result;
      this.text = text;
      // console.log(text);
      this.csvJSON(text);
    };

}
// convertedObj:any = "";

//   convert(objArray) {
//     console.log(objArray);
//     this.convertedObj = JSON.stringify(objArray, null, 2);
//     console.log(this.convertedObj);
    
//   }

confirm1(e) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      key:'positionDialog',
      accept: () => {
         this.convertFile(e)
      },
      reject: () => {
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
          
          }
      });
}


getAllCities(){

  this.comman.getAllCities().subscribe((data: any) => {
    if (data) {
      this.cities = JSON.parse(data);
      console.log(this.cities);
      console.log("All cities");


    }
  });

}



//------------------------------------filter the city name--------------------//
filterCity(event) {

this.comman.citySearchApi(event.query).subscribe((data:any)=>{
  this.filteredCity = JSON.parse(data)
})

  
}








}


