import { Component, OnInit } from '@angular/core';
import { CommanService } from './comman.service';

import * as $ from 'jquery' 

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  constructor(public comman:CommanService){

  }
  ngOnInit(): void {
    var reloadPage = localStorage.getItem('reload');
    console.log(reloadPage);
    if(reloadPage == '0'){
      localStorage.setItem('reload','1')
      location.reload();
    }
    this.loadInitialValues();
    // $('#commonGrid').DataTable({
    //   "paging": true,
    //   "lengthChange": true,
    //   "searching": true,
    //   "ordering": true,
    //   "info": true,
    //   "autoWidth": false,
    // });
  }

  loadInitialValues(){
    this.comman.loadinitialValues().subscribe((data:any)=>{
      this.comman.masterviewmodel.mastercity = data[0];
    })
  }

  // loadLanguages(){
  //   this.comman.loadLanguages().subscribe((data:any)=>{
  //     this.comman.masterviewmodel.mastercity = data[0];
  //   })
  // }


}
