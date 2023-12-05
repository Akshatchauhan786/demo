import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// }

@Injectable({
  providedIn: 'root'
})
export class SelectTemplateService {

  constructor( public http:HttpClient) { }
  gettemplateDate(value:any){
    return this.http.get<any[]>(environment.apiurl+'templateApi/getTemplatedata',value)
  }
}
