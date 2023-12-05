import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommanService } from 'src/app/shared/comman.service';
import { MessageService } from 'primeng/api';

import { NgxUiLoaderService } from "ngx-ui-loader";



@Component({
  selector: 'app-languagemaster',
  templateUrl: './languagemaster.component.html',
  styleUrls: ['./languagemaster.component.css']
})
export class LanguagemasterComponent {

  displayModal: boolean = false;
  displayBasic: boolean = false;
  columns: any[] = [{ title: 'S.No', id: 'sno' },
  { title: 'Language Name', id: 'Language_Name' },
  { title: 'Action', id: 'action' }]
  languages: any[] = [];

  sub_up: string = "Submit";
  dialogLabel: string = "Add Language";

  constructor(public comman: CommanService,private messageService: MessageService,private ngxService:NgxUiLoaderService) { }

ngOnInit(): void {


  // $('#commonGrid').DataTable({
  //   "paging": false,
  //   "lengthChange": false,
  //   "searching": false,
  //   "ordering": false,
  //   "info": true,
  //   "autoWidth": false,
  // });
  this.getLanguages();
}

showlanguageModalDialog() {
  this.displayModal = true;
}


showlanguageDialog() {
this.displayBasic = true;
this.sub_up = "Submit";
this.dialogLabel = "Add Language";
this.LanguageForm.reset();
}

getLanguages(){
  this.ngxService.startLoader('defLoader'); 


  this.comman.getAllLanguages().subscribe((data: any) => {
   // console.log(data);
    if (data) {
      this.languages = JSON.parse(data);
    //  console.log(this.languages);
    }
  });
  this.ngxService.stopLoader('defLoader');

}
deleteLanguage(event: any) {
  console.log(event);

  this.comman.deleteLanguage(event.Language_Id).subscribe((data: any) => {
    console.log(data);
    if (data) {
      console.log("deleted city successfully");
      this.getLanguages()
    }
  });
}

statusChangeLanguage(event: any) {
  let Status ;
  if(event.Status == 1 ){
    Status = 0;
  }else{
    Status = 1;
  }
  console.log(event.Language_Id , Status);
  this.comman.statusChangeLanguage(event.Language_Id , Status).subscribe((data: any) => {
    console.log(data);
    if (data) {

      console.log("Change Status of city successfully");
    }
    this.getLanguages();
  });
}


LanguageForm = new FormGroup({
  Language_Id: new FormControl(),
  Language_Name: new FormControl('',[Validators.required])
});


editLanguage(event: any) {
  this.sub_up = "Update";
  this.dialogLabel = "Update Language";
  this.displayBasic = true;
  this.LanguageForm.patchValue(event)
 // this.LanguageForm = event.city_id;

  console.log(this.LanguageForm.controls['Language_Name'].value, "Languages to be edited");
  console.log(event, "events");
}

submit(event: any) {

  let Language_Name = this.LanguageForm.controls['Language_Name'].value;
  let Language_Id = this.LanguageForm.controls['Language_Id'].value;
  console.log(Language_Name);
  console.log(Language_Id);

  if (Language_Name != '' && Language_Name != null) {

    if (Language_Id) {
      this.comman.updateLanguage(Language_Name, Language_Id).subscribe((data: any) => {
        if(data){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Language update successfully ' });


          this.displayBasic = false;
          console.log(data, "------language Updated");
        }else{
          this.messageService.add({severity:'warn', summary: ' Warning', detail:'Language not update  successfully'});

          console.log(data, "------Not Updated");
        }
        this.getLanguages();
      })
    } else {
      this.comman.submitLanguage(Language_Name).subscribe((data: any) => {
        if(data){
          this.displayBasic = false;

          

          this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Language registered  successfully ' });

          console.log(data, "------language Registered");
        }else{
          this.messageService.add({severity:'warn', summary: ' Warning', detail:'Language not registered '});

          console.log(data, "------Not Registered");
        }
        this.getLanguages();
      })
    }
  }else{
    this.messageService.add({severity:'warn', summary: ' Warning', detail:'Enter the valid language  '});

    // console.log("please Enter City Name")
  }
}


}
