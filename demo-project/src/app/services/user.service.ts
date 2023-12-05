import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';



// const headerdict = {
//   'Content-Type': 'application/json; charset=utf-8',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Headers' : '*',
//   'Access-Control-Allow-Origin': '*'
// }
// let requestOptions = {
//   headers: new HttpHeaders(headerdict)
// }

// let headers = new HttpHeaders();
// headers.append('Access-Control-Allow-Origin', '*');
// headers.append('Content-Type', 'application/json; charset=utf-8')
// headers.append('Content-Encoding', 'utf-8')

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(public http: HttpClient) { }





  authenticateUser(userName:any, password:any){

    var data = JSON.stringify({userName: userName, password: password})
    console.log(data, 'sent data');
    
    return this.http.post<any[]>(environment.apiurl+'whatsappapi/loginuser',data, httpOptions)
  }


  submit_registration_user(value:any){
    return this.http.post<any[]>(environment.apiurl+'whatsappapi/registrationUser',value, httpOptions)
  }

  get_my_license_details(Client_Id){
    return this.http.post(environment.apiurl+'Approvelestapi/getClientDataOne', {Client_Id:Client_Id},httpOptions);

  }



}
