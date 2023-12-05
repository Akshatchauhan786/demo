import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router: Router){
  
}
  canActivate() {
    var dataForAuth = localStorage.getItem('userdetails');
    console.log(dataForAuth, 'auth');
    
    if(dataForAuth){
      return true
    }
    else{
      this.router.navigate(['login'])
      return false
    }
  }
  
}
