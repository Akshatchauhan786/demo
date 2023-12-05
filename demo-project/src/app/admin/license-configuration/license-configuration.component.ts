import { Component, OnInit } from '@angular/core';
import { CommanService } from 'src/app/shared/comman.service';
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-license-configuration',
  templateUrl: './license-configuration.component.html',
  styleUrls: ['./license-configuration.component.css']
})
export class LicenseConfigurationComponent implements OnInit {
  columns: any[] = [
    { title: 'S.No', id: 'sno' },
    { title: 'Company', id: 'Company_Name' },
    { title: 'Client', id: 'Name' },
    { title: 'Start', id: 'start_date' },
    { title: 'End', id: 'end_date' },
    { title: 'Duration', id: 'Duration' },
    { title: 'Status', id: 'Status' },
    { title: 'Action', id: 'action' },
  ];
  
  license_list:any[]=[]

  constructor(public comman: CommanService,private ngxService:NgxUiLoaderService
    ){}
  // cities:any[] = [];
  ngOnInit(): void {

   this.getAllUsersLicense()
   
  }

  getAllUsersLicense(){
    this.ngxService.startLoader('defLoader'); 

    this.comman.license_details_get_all().subscribe((data:any)=>{

      if(JSON.parse(data)?.length){
        this.license_list = JSON.parse(data)
      }
    })
    this.ngxService.stopLoader('defLoader');

  }
  updateLicenseDetails(event){
    // console.log(event[0], event[1])
    this.comman.renewLicense(event[0], event[1]).subscribe((data:any)=>{
      this.getAllUsersLicense()
    })
  }
}
