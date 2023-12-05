import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{ citymaster } from './models/masterFormModel'
import { masterviewmodel } from './models/masterViewModel';
import { forkJoin } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class CommanService {



  baseUrl: string = environment.apiurl;

  masterviewmodel: masterviewmodel = new masterviewmodel();
  languagesDataModel = [1,2,3,4,5,6,7];
  contactData:any[] = [];

  // masterData:any

  constructor(public http: HttpClient) { }


  // master apis
  //------------------------------- city API's---------------------------------
  getAllCities(){
    return this.http.get(this.baseUrl+'masterApi/getCityData');
  }

  deleteCity(id:any){
    return this.http.post(this.baseUrl+'masterApi/deleteCity', {city_id: id});
  }

   public loadinitialValues(){
     let masterCityData = this.getAllCities();
     return forkJoin([masterCityData])
   }

  statusChangeCity(id:string , Status:string){
    return this.http.post(this.baseUrl+'masterApi/UpdateCityStatus', {city_id: id , Status:Status});
   }

   submitCity(data:any){
    return this.http.post(this.baseUrl+'masterApi/insertCity', {City_Name: data});
  }

   updateCity(data:any , id : any){
  return this.http.post(this.baseUrl+'masterApi/UpdateCitydata', {City_Name:data,city_id:id});
   }


  //---------------------------------- Contact API's----------------------------------------------

  getAllContacts(client_id:any){
    console.log(client_id, "client_id service called");
    return this.http.post(this.baseUrl+'masterApi/getContactsData' , {client_id:client_id});
  }
  deleteContact(id:any , client_id:any){
    return this.http.post(this.baseUrl+'masterApi/deleteContacts', {cont_id: id , client_id:client_id});
  }

  statusChangeContact(id:string , blocked_contacts:string ,client_id:string){
    console.log(id,  blocked_contacts , client_id  ,"id,  blocked_contacts , client_id"  );
    
    return this.http.post(this.baseUrl+'masterApi/UpdateContactsStatus', { cont_id: id ,client_id:client_id, blocked_contacts:blocked_contacts});
   }UpdateContactsStatus

   submitContactSingle(contacts_name:any ,contacts_number:any, email_id:any , client_id:any,City_Name:any){
    return this.http.post(this.baseUrl+'masterApi/insertContacts', {contacts_name:contacts_name ,contacts_number:contacts_number, email_id:email_id , client_id:client_id,City_Name:City_Name});
  }

   submitContact(value:any ){
    return this.http.post(this.baseUrl+'masterApi/insertContacts1',value, httpOptions);
  }

    updateContact(data:any ,contactNo:any, id : any, email_id:any , client_id:any,City_Name:any){
  return this.http.post(this.baseUrl+'masterApi/UpdateContactsData', {contacts_name:data,contacts_number: contactNo, email_id:email_id, client_id:client_id, cont_id:id,City_Name:City_Name});
   }


  //---------------------------------- UserMaster API's----------------------------------------------

getAllUsers(clientID){
  return this.http.post<any>(this.baseUrl+'WhatsappApi/getuserdata',{clientID});
}

deleteUser(id:any){
  return this.http.post(this.baseUrl+'WhatsappApi/deleteuser', {userID: id});
}

statusChangeUser(id:string , Status:string){
  return this.http.post(this.baseUrl+'WhatsappApi/updateUserStatus',  {userID : id , Status:Status} );
 }


 resetPasswordAPI(id:any , client_id:any, password:any){
  
  return this.http.post(this.baseUrl+'whatsappapi/resetpassword',  {userID : id , Client_Id:client_id,Password:password} );
 }



 submitUser(value:any){
  return this.http.post<any[]>(this.baseUrl+'WhatsappApi/registrationUser',value );
}

updateUser(value:any){  
return this.http.post(this.baseUrl+'WhatsappApi/Updateuserdata', value ,  );
}


  //------------------------------- language API's---------------------------------
 
  getAllLanguages(){
    return this.http.get(this.baseUrl+'languageApi/getlanguageData');
  }
   deleteLanguage(id:any){
    return this.http.post(this.baseUrl+'languageApi/deletelanguage', {Language_Id: id});
  }

  statusChangeLanguage(id:string , Status:string){
    return this.http.post(this.baseUrl+'languageApi/UpdateLanguageStatus', {Language_Id: id , Status:Status});
   }

   submitLanguage(data:any){
    console.log("in Lang Submit Service");
    return this.http.post(this.baseUrl+'languageApi/insertlanguage', {Language_Name: data});
  }

   updateLanguage(data:any , id : any){
  return this.http.post(this.baseUrl+'languageApi/Updatelanguagedata', {Language_Name:data,Language_Id:id});
   }

   messagetemplateAPI(client_id:any){
    return this.http.post(this.baseUrl+'MessagingApi/geMessagingData',  { Client_Id:client_id} );
   }  

   getapproval_listApi(){
    return this.http.get(this.baseUrl+'Approvelestapi/getClientData');
  }
  approvalclient_api(Client_Id:any, Status:any){
    return this.http.post(this.baseUrl+'Approvelestapi/approveUser' , {client_id:Client_Id, Status:Status});
  }

  license_details_get_all(){
    return this.http.get(this.baseUrl+'Approvelestapi/getClientAllData');
  }

  renewLicense(Client_Id, end_date){
    return this.http.post(this.baseUrl+'approveLestApi/UpdateLicence' , {Client_Id, end_date});
  }

//--------------block list api-----------------------------------
  getBlocklsit(Client_Id:any){

    return this.http.post(this.baseUrl+'masterApi/getBlockedContactsData',{client_id:Client_Id,});
  }

  citySearchApi(text:any){
    return this.http.post(this.baseUrl+'masterApi/getCitySearchData', {City_Name: text});
  }



}
