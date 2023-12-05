import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import "jquery";
import "datatables.net";
import { CommanService } from 'src/app/shared/comman.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from "ngx-ui-loader";


// import { CommanService } from '../comman.service';
// import "datatables.net-dt";
// import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-citymaster',
  templateUrl: './citymaster.component.html',
  styleUrls: ['./citymaster.component.css']
})
export class CitymasterComponent implements OnInit, OnChanges {

  displayModal: boolean = false;
  displayBasic: boolean = false;
  columns: any[] = [{ title: 'S.No', id: 'sno' },
  { title: 'City Name', id: 'City_Name' },
  { title: 'Action', id: 'action' }]
  cities:any[] = [];
  cityId: number;

  sub_up: string = "Submit";
  dialogLabel: string = "Add City ";

  constructor(public comman: CommanService,private messageService: MessageService,private ngxService:NgxUiLoaderService) { }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }


  ngOnInit() {

    // this.ngxService.startLoader('defLoader'); 


    // this.displayData = this.comman.loadinitialValues()

    // $('#citymaster').DataTable({
    //   "paging": true,
    //   "lengthChange": true,
    //   "searching": true,
    //   "ordering": true,
    //   "info": true,
    //   "autoWidth": false,
    // });
    this.getAllCities();

  
      
  }

  getAllCities(){
    this.ngxService.startLoader('defLoader'); 
    this.comman.getAllCities().subscribe((data: any) => {
      if (data) {
        this.cities = JSON.parse(data);
        console.log(this.cities);
        console.log("All cities");

      }
      this.ngxService.stopLoader('defLoader');

    });
  
  }

  showModalDialog() {
    this.displayModal = true;
    
  }

  showBasicDialog() {
    this.sub_up = "Submit";
    this.dialogLabel = "Add City ";
    this.displayBasic = true;
    this.cityForm.reset();
  }

  // parseData(data: any) {
  //   if (data != undefined && data != null && data != '') {
  //     console.log(data , "---------------------------");
      
  //     return JSON.parse(data)
  //   }
  // }

  deleteCity(event: any) {
    console.log(event);

    this.comman.deleteCity(event.city_id).subscribe((data: any) => {
      console.log(data);
      if (data) {
        console.log("deleted city successfully");
        this.getAllCities()
        
      }
    });
  }

  changeStatusCity(event: any) {
    let Status ;
    if(event.Status == 1 ){
      Status = 0;
    }else{
      Status = 1;
    }
   
    console.log(event.city_id , Status);
    
    this.comman.statusChangeCity(event.city_id , Status).subscribe((data: any) => {
      console.log(data);
      if (data) {
        console.log("Change Status of city successfully");
      }
      this.getAllCities();
    });
  }


  cityForm = new FormGroup({
    city_id: new FormControl(),
    City_Name: new FormControl('',[Validators.required])
  });


  editCity(event: any) {
    this.sub_up = "Update";
    this.dialogLabel = "Update City ";
    this.displayBasic = true;
    this.cityForm.patchValue(event)
    this.cityId = event.city_id;

    console.log(this.cityForm.controls['City_Name'].value, "city to be edited");
    console.log(event, "events");
  }

  submit(event: any) {
 
  
    let City_Name = this.cityForm.controls['City_Name'].value;
    let cityId = this.cityForm.controls['city_id'].value;
    
    if (this.cityForm.valid) {

      if (cityId) {
        this.comman.updateCity(City_Name, cityId).subscribe((data: any) => {
          if(data){
            this.messageService.add({severity:'success', summary: 'Success', detail:'City update successfully '});

            console.log(data, "------City Updated");
            this.displayBasic=false;
          }else{
            this.messageService.add({severity:'warn', summary: 'Warning', detail:' Enter the valid city name'});


            console.log(data, "------Not Updated");
          }
          this.getAllCities();
        })
      } else {
        this.comman.submitCity(City_Name).subscribe((data: any) => {
          if(data){
            console.log(data, "------City Registered");
            this.messageService.add({severity:'success', summary: 'Success', detail:'City submit successfully '});


            this.displayBasic=false;
          }else{

            this.messageService.add({severity:'warn', summary: 'Warning', detail:' Enter the valid city name'});

            console.log(data, "------Not Registered");
          }
          this.getAllCities();
        })
      }
    }else{
     
      this.messageService.add({severity:'warn', summary: 'Warning', detail:' Enter city name'});


    }


  }


}