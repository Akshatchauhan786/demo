import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API = environment.apiurl;
  constructor(private http: HttpClient) { }

  login(userdata: any): Observable<any> {
    console.log('login=>>>>', userdata)
    return this.http.post(this.API + "user/login", { userdata });
  }

  signup(userdata: any): Observable<any> {
    console.log('signup=>>>>', userdata)
    return this.http.post(this.API + "user/createuser", { userdata });
  }
}
