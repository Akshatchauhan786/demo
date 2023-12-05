import { Component, Input,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment';
import { TemplateService } from 'src/app/services/template.service';
import { ConfirmationService } from 'primeng/api';
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-templatemaster',
  templateUrl: './templatemaster.component.html',
  styleUrls: ['./templatemaster.component.css']
})
export class TemplatemasterComponent {

  public index = 1;
  public index2 = 1;



  media_url:any
  template_document_baseurl: any;


  templatedata: any;

  // register insert details
  templateinsert: FormGroup;
  // register insert End details
  // id:any
  headerType: any;
  headerText: string;
  bodyText: any;
  footerText: any;
  bottomType: any;
  callphonetextbtn: any;
  websitetextbtn: any;
  customlink: any;
  Marketingoptout: 'Marketing opt-out';
  insidepath:any
  displayModal: boolean = false;

  name: any
  btmname: any

  secectbutton11: any
  secectbutton12: any
  displayBasic: boolean = false;
  callToActionType: any
  docvalue: any = 'image';
  templatlanguageinset: any;
  imageSrc: string | ArrayBuffer | null;

  header__type:any

  formData = new FormData()


  userdetails = JSON.parse(localStorage.getItem('userdetails'))
  Client_Id = this.userdetails.Client_Id


  showModalDialog() {

    
    // this.displayModal = true;
    this.displayModal=true
  }



  showBasicDialog() {
    this.header__type='Add Template'
    this.displayBasic = true;
    // this.displayModal=true;
     
  }


  



  // for add city name in city master
  value1: any;
  // for add city name in city master

  name1 = 'test'
  cfForm: FormGroup;

  constructor(private fb: FormBuilder,private ngxService:NgxUiLoaderService,public messageservice: MessageService, public templateservice: TemplateService, private route: Router, public Confirmationservice: ConfirmationService) {
    this.cfForm = this.fb.group({
      HeaderText: [''],
    });


  }

  ngOnInit(): void {
      this.ngxService.startLoader('defLoader'); 



    setTimeout(() => {
      $('#templateActive').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,

      });

      $('#templatedelete').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
      });
    }, 200);
    console.log("in onInit");

    this.gettemplatedata()

    this.createTemplateForm();
    this.template_document_baseurl = environment.documentUrl;

    // this.interttemplanguage()

    this.gettemplateLanguage()
    this.gettemplatecategory()
    this.getStatusAcitve()
    this.getdeletedata();

    var userdetials = JSON.parse(localStorage.getItem('userdetails'))
    console.log(userdetials);

    this.templateinsert.patchValue({ client_id: userdetials.Client_Id });
    console.log(this.templateinsert.value);

  }



  bottomselect() {
    var ele = document.getElementById('bottomType') as HTMLSelectElement;
    this.bottomType = ele.value;
    console.log(this.bottomType);
  }

  headerimage(docvalue: any) {
    console.log("nitish",docvalue);
    this.docvalue = docvalue
  }

  
   
  



  // bottomselect(event: any) {
  //   console.log('deepak dixit', event.value, this.btmname);
  //   this.secectbutton12 = this.btmname
  // }
  typeOfAction() {
    var element = document.getElementById('callToAction') as HTMLSelectElement;
    console.log(element.value)
    this.callToActionType = element.value
  }



  gettemplatedata() {
    // this.ngxService.startLoader('defLoader'); 

    this.templateservice.gettemplateDate(this.Client_Id).subscribe((data: any) => {
      // console.log(data);
      let objData = eval(data)
      this.templatedata = objData
      // console.log(this.templatedata);
     

    })
    // this.ngxService.stopLoader('defLoader');



  }



  // intert template details


  createTemplateForm() {
    this.templateinsert = new FormGroup({
      header_type: new FormControl('none'),
      template_name: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      text_header: new FormControl(''),
      text_body: new FormControl('', Validators.required),
      text_footer: new FormControl(''),
      media: new FormControl(''),
      media_type: new FormControl(''),
      // media_document: new FormControl(''),
      call_type: new FormControl(''),
      call_type_button_text: new FormControl(''),
      call_type_conutry: new FormControl(''),
      call_type_phone_no: new FormControl(''),
      Marketing_type: new FormControl(''),
      Marketing_type_button_text: new FormControl(''),
      Marketing_type_footer_text: new FormControl(''),
      Marketing_type_custom: new FormControl(''),
      Marketing_type_custom_button_text: new FormControl(''),
      URL_type: new FormControl(''),
      website_url: new FormControl(''),
      web_type_button_text: new FormControl(''),
      button_type: new FormControl(''),
      client_id: new FormControl(''),
      temp_id: new FormControl(''),
      video:new FormControl(''),
      Status: new FormControl('N'),
    });
    console.log(this.templateinsert);
    




  }

  // 



  //  interttemplanguage(){
  //   this.templatlanguageinset = new FormGroup({
  //     Language_Name:new FormControl(''),
  //   });

  //  }


  // for text Editer Start hear

  addvarediter() {
    let el = this.index++
    console.log(el);
   var obj= (this.templateinsert.controls['text_body'].value)+'{{'+el+'}}'
   console.log(obj);
   this.templateinsert.patchValue({text_body:obj})

  }

  // for text Editer Start hear
  
  // for text header Start hear 
  cnagehead(event){
    console.log(this.templateinsert.controls['text_header , text_body'].value);
    var varLen = this.templateinsert.controls['text_header, text_body'].value.match(/{{/g).length
    console.log(varLen);
    var tempdata = this.templateinsert.controls['text_header, text_body'].value;
    for(var i = 0; i < varLen; i++){
      tempdata = tempdata.replace(tempdata.substr(tempdata.indexOf('{{'), 5),'~~~');
    }
    for(var i = 0; i < varLen; i++){
      tempdata = tempdata.replace('~~~',`{{${i+1}}}`);
    }
    this.index = varLen+1
    console.log(tempdata);
  this.templateinsert.patchValue({text_header:tempdata });
  console.log(this.templateinsert.value);
  }
  addvarheader(){
    let el = this.index++
    console.log(el);
   var obj= (this.templateinsert.controls['text_header'].value)+'{{'+el+'}}'
   console.log(obj);
   this.templateinsert.patchValue({text_header:obj})
  }


  

  gettemplateDate() {
    this.templateservice.gettemplateDate(this.Client_Id).subscribe((data: any) => {
      console.log();

    })
  }

  languageshow: any;
  gettemplateLanguage() {

    this.templateservice.gettemplateLanguage().subscribe((data: any) => {
      console.log(data);
      var da = JSON.parse(data)
      console.log(da);
      this.languageshow = da;
    })

  }

  categoryshow: any;
  gettemplatecategory() {

    this.templateservice.gettemplatecategory().subscribe((data: any) => {
      console.log(data);
      var da = JSON.parse(data)
      console.log(da,'select');
      this.categoryshow = da;
    })

  }

  fileName:any;

  onFileSelected(event) {

    // const file:File = event.target.files[0];

//     if (event) {

//         // this.fileName = file.name;

//         // const formData = new FormData();
//         console.log('this.fileName = file.name; ===============');
      
//         formData.append("1/template_name", file);
//         console.log(formData,'form data  -----------------------------------');
       
        
// }
}





  submit_template() {

    if (this.templateinsert.controls['media_type'].value=='' ||this.templateinsert.controls['media_type'].value=='text'){

          
      this.templateinsert.patchValue({ media: this.insidepath })
      // console.log(this.templateinsert.value)

      if(this.templateinsert.value['header_type']=='none'){
        this.templateinsert.patchValue({media_type: 'none'})


      }
      else if(this.templateinsert.value['header_type']=='text'){
        this.templateinsert.patchValue({media_type: 'text'})

      }
      else{
        this.templateinsert.patchValue({media_type: this.docvalue})

      }

      

      // this.templateinsert.patchValue({media_type: this.docvalue})
      // console.log(this.templateinsert.value,"typppppppp")
      // var result = this.tem
      if (this.templateinsert.valid) {
  
  
          if (this.templateinsert.controls['temp_id'].value == '' || this.templateinsert.controls['temp_id'].value == null || this.templateinsert.controls['temp_id'].value == undefined) {
            // console.log("in submit template");
            this.templateservice.submit_template(this.templateinsert.value).subscribe((data: any) => {
              // console.log(datadata);
             
              var da = JSON.parse(data)
            
              if (data != '') {

                this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Sucessfully' });
                //  this.messageservice.add({severity:'success', summary: 'Warning', detail: 'Sucessfull'});
                // this.displayBasic = false
                this.gettemplatedata()
                this.displayBasic = false
              }
            })
          } else {
            
            
            this.templateservice.edittemplate(this.templateinsert.value).subscribe((data: any) => {
             
              if (data.length > 0) {
             
                if (data != '') {
                  this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Sucessfully' });
  
                 
                  this.gettemplatedata()
                  this.displayBasic = false
                }
  
              }
              else {
                this.messageservice.add({ severity: 'error', summary: 'error', detail: 'Please Fill Mandatory feild' });
              }
            })
          }
  
      }
      else {

        this.findInvalidControls();
 
      }


    }


    else{


      if(this.media_url){
        this.templateinsert.patchValue({ media: this.Client_Id + '/' + this.templateinsert.controls['template_name'].value + '.' +   this.media_url.substr(this.media_url.lastIndexOf('.') + 1)})
        console.log(this.templateinsert.value);
        
        this.templateservice.insidefile_upload(this.formData).subscribe((data:any)=>{
          this.insidepath = data;
        })
      }
 


      // if(data.message == undefined){
        
    // console.log(this.templateinsert.value)
    this.templateinsert.patchValue({media_type: this.docvalue})
    // console.log(this.templateinsert.value,"typ")
    // var result = this.tem
    if (this.templateinsert.valid) {


      // if (this.templateinsert.value == this.templateinsert.value) {
        // console.log('valid');
        if (this.templateinsert.controls['temp_id'].value == '' || this.templateinsert.controls['temp_id'].value == null || this.templateinsert.controls['temp_id'].value == undefined) {
          // console.log("in submit template");
          this.templateservice.submit_template(this.templateinsert.value).subscribe((data: any) => {
            // console.log(datadata);
            // console.log(data, 'response data');
            var da = JSON.parse(data)
            // console.log(da);
            if (data != '') {

              // this.templateinsert.reset();
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Sucessfully' });
              //  this.messageservice.add({severity:'success', summary: 'Warning', detail: 'Sucessfull'});
              // this.displayBasic = false
              this.gettemplatedata()
              this.displayBasic = false
            }
          })
        } else {
          // console.log("in edit template");

          // this.templateinsert.patchValue({ media: this.insidepath })
          // console.log(this.templateinsert.value)
          console.log(this.docvalue, '------');
          
            this.templateinsert.patchValue({media_type: this.docvalue})
          
          this.templateservice.edittemplate(this.templateinsert.value).subscribe((data: any) => {
            // console.log(this.templateinsert.value);

           

            // console.log(data, 'response data');
            if (data.length > 0) {
             // var da = JSON.parse(data)
            //  console.log(da);
              if (data != '') {

                // this.templateinsert.reset();
                this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Sucessfully' });

                this.gettemplatedata()
                this.displayBasic = false

              }

            }
            else {
              this.messageservice.add({ severity: 'error', summary: 'error', detail: 'Please Fill Mandatory feild' });
            }
          })
        }
      // }

    }
    else {

      // this.messageservice.add({severity:'error', summary: 'Warning', detail: 'Please Fill Mandatory feild'});
      // console.log('invalid');
      this.findInvalidControls();



    }


      // }
      // else{

      // } 

    }


  }






  
  // invalid:any
  findInvalidControls() {
    let invalid;
    const controls = this.templateinsert.controls;
    for (const text_body in controls) {
      if (controls[text_body].status == 'INVALID') {
        invalid = text_body;
        this.messageservice.add({ severity: 'error', summary: 'Required Field', detail: `${(invalid.charAt(0).toUpperCase() + invalid.slice(1)).replace('_', ' ')}` });

        break;
      }
    }
    return invalid;
  }

  edittemplate(item: any) {

    this.header__type= " Edit Template"
    
    
    this.displayBasic = true
    this.templateinsert.patchValue(item)
    this.gettemplatedata();
    this.templateinsert.patchValue({
      temp_id: item.id,
      media: item.media,
      // video:'.1/Template New.mp4'
      
    })
   
    this.imageSrc = 'http://192.168.1.123/botinpro/' + item.media
    this.templateinsert.patchValue({header_type: item.header_type }) 
    this.headerType = item.header_type
    // this.headerselect();

    // this.templateinsert.patchValue({media: item.media_type }) 
    this.headerimage(item.media_type)

  }

  headerselect() {
    var ele = document.getElementById('headerType') as HTMLSelectElement;

    this.headerType = ele.value;
    console.log(this.headerType,'11');
  }

  delete_template(item: any) {

    this.Confirmationservice.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.templateservice.delete_template(item, this.Client_Id).subscribe((data: any) => {
          this.gettemplatedata()
          this.messageservice.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        })
      },
      reject: (type) => {
        this.messageservice.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  Permanentdelete_template(item: any) {

    this.Confirmationservice.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.templateservice.Permanentdelete_template(item, this.Client_Id).subscribe((data: any) => {
          this.gettemplatedata()
          this.messageservice.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        })
      },
      reject: (type) => {
        // this.messageservice.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
      }
    });
  }
  isphone: boolean;
  iswebsite: boolean;
  checkValue(event: any) {
    // console.log(event.target.checked);
    if (event.target.checked == true) {
      this.isphone = true;
    } else {
      this.isphone = false;
    }
  }

  checkwebsite(event: any) {
    // console.log(event.target.checked);
    if (event.target.checked == true) {
      this.iswebsite = true;
    } else {
      this.iswebsite = false;
    }
  }
  // image upload start form hear

  readURL(event) {
    // const inpBtn = document.getElementById('myfile') as HTMLInputElement;
    // console.log(inpBtn.value)
 
    const file = event.target.files[0];


    this.media_url=file.name   
    
    if (file) {
      console.log(file.name, 'filename');
      var ext = file.name.substr(file.name.lastIndexOf('.') + 1)
      

      var t=this.templateinsert.value['template_name']
      var c =this.templateinsert.value['client_id']
      var d=c +'/'+t + '.' +ext;
      console.log(d);
      
      this.formData.append(d,file)
    }  
    
    if(file.type == 'image'){

      
    }
    else if(file.type == 'doc'){

    }
    else{
     
    }
    const reader = new FileReader();
      // this.imageSrc = reader.result;
      reader.onload = e => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);

  }
  
  resettemplateform(){
    this.templateinsert.reset();
    this.media_url = ''
    this.docvalue = ''
  }

  
  // onFileSelected_viedo(event: any) {
  //   const file = event.target.files[0];
  //   this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  //   this.videoPlayer.nativeElement.load();
  //   this.videoPlayer.nativeElement.play();
  // }


  @Input()
  maxNumberOfCharactersTemplate = 30;
  maxNumberOfCharactersHeader = 60;
  maxNumberOfCharactersbody = 1024;
  maxNumberOfCharactersFOOTER = 70;
  maxNumberOfCharactersCuston = 35;
  counter = true;

  numberOfCharacters1 = 0;
  // numberOfCharacters2 = 0;
  interaction = {
    textValue: ''
  };

  //   onTemplate(event: any): void {
  //   this.numberOfCharacters1 = event.target.value.length;

  //   if (this.numberOfCharacters1 > this.maxNumberOfCharacters) {
  //     event.target.value = event.target.value.slice(0, this.maxNumberOfCharacters);
  //     this.numberOfCharacters1 = this.maxNumberOfCharacters;
  //   }
  // }

  Activedata: any
  deletedata: any
  getStatusAcitve(Status = 'A') {
    this.templateservice.StatusApi(Status, this.Client_Id).subscribe((data: any) => {
      // console.log(data , "getstatus data");
      if (data != null && data != "") {


        var da = JSON.parse(data)
        // console.log(da);
        // let objData =eval(data)
        this.Activedata = da
        // console.log("getting Activedata");
        
        // console.log(this.Activedata);
      }
    })
  }

  getdeletedata(Status = 'D') {
    this.templateservice.StatusApi(Status, this.Client_Id).subscribe((data: any) => {
      // console.log(data);
      if (data != null && data != "") {
        var da = JSON.parse(data)
        // console.log(da);
        // let objData =eval(data)
        this.deletedata = da
         
        // console.log(this.deletedata);
      }
    })
     this.ngxService.stopLoader('defLoader'); 

  }


 
  

  

}
