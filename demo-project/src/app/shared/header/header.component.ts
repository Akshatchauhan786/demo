import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  constructor() {}
  theme:string = 'light';

  ngOnInit() {
  
  }

  changeTheme(theme:any){
    var navbar = document.getElementsByClassName('main-header')[0] as HTMLDivElement;
    var sidebar = document.getElementsByClassName('main-sidebar')[0] as HTMLDivElement;
    var body = document.getElementsByTagName('body')[0] as HTMLBodyElement
    if(theme == 'light'){
      //navbar
      navbar.classList.add('navbar-dark')
      navbar.classList.add('dark-mode')

      // sidebar
      sidebar.classList.add('sidebar-dark-teal')
      sidebar.classList.remove('sidebar-light-teal')
      sidebar.classList.add('dark-mode')
      // body
      body.classList.add('dark-mode');
      this.switchTheme('dark')
      
      this.theme = 'dark'
    }
    else{
      //navbar
      
      navbar.classList.remove('navbar-dark')
      navbar.classList.remove('dark-mode');
      
      // sidebar
      sidebar.classList.remove('sidebar-dark-teal')
      sidebar.classList.add('sidebar-light-teal')
      sidebar.classList.remove('dark-mode')
      
      // body
      body.classList.remove('dark-mode');
      this.switchTheme('light')

      this.theme ='light';

      //yable
    

    }
    
  }
  switchTheme(theme:string){
    let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if(themeLink){
      themeLink.href = './assets/css/bs-'+theme + '.css';
    } 
  }



}
