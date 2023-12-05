import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  userDetails: any;

  ngOnInit(): void {

    this.userDetails = localStorage.getItem('userdetails')
    this.userDetails = JSON.parse(this.userDetails);

    // console.log( this.userDetails.Email_Address,'emmmmmmmmmmmmmmmmmmmmmmm');
    

  }

}
