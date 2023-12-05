import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(public http:HttpClient) { }

  submit_template(value:any,){
    console.log(value);
    
    return this.http.post<any[]>(environment.apiurl+'templateApi/inserttemplatedata',value,httpOptions)
    
  }

  gettemplateDate(client_id:any){
    console.log(client_id , "in service");
    
    return this.http.post<any[]>(environment.apiurl+'templateApi/getTemplatedata',{client_id:client_id})
  }



// -------------Get Approved template api----------- //
  gettemplateApprove_api(client_id:any){
    
    return this.http.post<any[]>(environment.apiurl+'templateApi/getTemplateApprovedata',{client_id:client_id})
  }

  gettemplateApproveEdit_api(client_id:any,temp_id:any){
    
    return this.http.post<any[]>(environment.apiurl+'templateApi/getTemplatedataEdit',{client_id:client_id,temp_id:temp_id})
  }





  delete_template(item:any, client_id:any){
    console.log(item , client_id);
    return this.http.post<any[]>(environment.apiurl+'templateApi/deletetemplateStatus',{Del_id:item, client_id:client_id})
  }

  edittemplate(value:any ){
    return this.http.post<any[]>(environment.apiurl+'templateApi/UpdateTemplatedatadata',value )
  }

  gettemplateLanguage(){
    return this.http.get<any[]>(environment.apiurl+'languageApi/getLanguageData')
  }

  gettemplatecategory(){
    return this.http.get<any[]>(environment.apiurl+'categoryApi/getCategoryData')
  }
 
  StatusApi(Status:any, client_Id:any){
   
    return this.http.post<any[]>(environment.apiurl+'templateApi/getTemplatedataStatus',{Status:Status , client_Id:client_Id})
  }
  
   Permanentdelete_template(item:any , Client_Id:any){
    console.log(item);
    return this.http.post<any[]>(environment.apiurl+'templateApi/deletetemplate',{Del_id:item , Client_Id:Client_Id})
  }


  insidefile_upload(value:any){
    console.log(value, 'service value')

    
    return this.http.post<any[]>(environment.apiurl+'/fileuplode', value)
  }
  

}
