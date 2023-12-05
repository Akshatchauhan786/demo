import { Component } from '@angular/core';
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

  media_url: any
  template_document_baseurl: any;
  templatedata: any;
  templateinsert: FormGroup;
  headerType: any;
  bottomType: any;
  // Marketingoptout: 'Marketing opt-out';
  insidepath: any
  displayBasic: boolean = false;
  callToActionType: any
  docvalue: any = 'image';
  imageSrc: string | ArrayBuffer | null;
  header__type: any
  formData = new FormData()
  userdetails = JSON.parse(localStorage.getItem('userdetails'))
  Client_Id = this.userdetails.Client_Id

  maxNumberOfCharactersTemplate: number = 30;
  maxNumberOfCharactersHeader: number = 60;
  maxNumberOfCharactersbody: number = 1024;
  maxNumberOfCharactersFOOTER: number = 70;
  maxNumberOfCharactersCuston: number = 35;

  isphone: boolean;
  iswebsite: boolean;
  Activedata: any;
  deletedata: any;

  public index =  1;
  public index2 = 1;



  constructor(private ngxService:NgxUiLoaderService,private fb: FormBuilder, public messageservice: MessageService, public templateservice: TemplateService, private route: Router, public Confirmationservice: ConfirmationService) { }

  ngOnInit(): void {
    var userdetials = JSON.parse(localStorage.getItem('userdetails'))
    console.log(userdetials.Client_Id);
    
    this.gettemplatedata()
    this.createTemplateForm();
    this.template_document_baseurl = environment.documentUrl;
    this.gettemplateLanguage()
    this.gettemplatecategory()
    this.getStatusAcitve()
    this.getdeletedata();
  }

  // Template form
  createTemplateForm() {
    this.templateinsert = new FormGroup({
      header_type: new FormControl('none'),
      template_name: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      text_header: new FormControl(),
      text_body: new FormControl('', Validators.required),

      text_footer: new FormControl(''),
      media: new FormControl(''),
      media_type: new FormControl(''),
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
      video: new FormControl(''),
      Status: new FormControl('N'),
      number_variablel_header:new FormControl(''),

      number_variablel_body:new FormControl('')

    });
  }

  showBasicDialog() {
    this.header__type = 'Add Template'
    this.displayBasic = true;
  }

  bottomselect() {
    var ele = document.getElementById('bottomType') as HTMLSelectElement;
    this.bottomType = ele.value;
    console.log(this.bottomType);
  }

  headerimage(docvalue: any) {
    console.log("nitish", docvalue);
    this.docvalue = docvalue
  }

  typeOfAction() {
    var element = document.getElementById('callToAction') as HTMLSelectElement;
    console.log(element.value)
    this.callToActionType = element.value
  }

  gettemplatedata() {
    this.ngxService.startLoader('defLoader'); 

    
    this.templateservice.gettemplateDate(this.Client_Id).subscribe((data: any) => {
      let objData = eval(data)
      this.templatedata = objData
    })
    this.ngxService.stopLoader('defLoader');

  }

  gettemplateDate() {
    this.templateservice.gettemplateDate(this.Client_Id).subscribe((data: any) => {
    })
  }

  languageshow: any;
  gettemplateLanguage() {
    this.templateservice.gettemplateLanguage().subscribe((data: any) => {
      var da = JSON.parse(data)
      this.languageshow = da;
    })

  }

  categoryshow: any;
  gettemplatecategory() {
    this.templateservice.gettemplatecategory().subscribe((data: any) => {
      var da = JSON.parse(data)
      this.categoryshow = da;
    })
  }





// for text Editer Start hear




  addvarheader(control){
    if (this.templateinsert.controls[control].value == '') {
      this.index = 1;
    }
    else {

      if(this.templateinsert.controls[control].value==null){
        this.index = 1;
      }
      else{
      var varLen = this.templateinsert.controls[control].value?.match(/{{/g)?.length
      this.index = varLen+1;
      }

    }

  var el = this.index++
  if(this.templateinsert.controls['text_header'].value==null){
    var obj= '{{'+el+'}}'
  }
  else{
    var obj= (this.templateinsert.controls['text_header'].value)+'{{'+el+'}}'


  }
  


  
   this.templateinsert.patchValue({text_header:obj})
  }


changeVariables(event, control) {
  console.log(this.templateinsert);
  

    if (this.templateinsert.controls[control].value == '') {
      this.index = 1;
    }
    else {
      if(this.templateinsert.controls[control].value==null){
        this.index = 1;
      }
      else{
        var varLen = this.templateinsert.controls[control].value.match(/{{/g)?.length
        this.index = varLen

      }

      var tempdata = this.templateinsert.controls[control].value;
      for (var i = 0; i < varLen; i++) {
        tempdata = tempdata.replace(tempdata.substr(tempdata.indexOf('{{'), 5), '~~~');
      }
      for (var i = 0; i < varLen; i++) {
        tempdata = tempdata.replace('~~~', `{{${i + 1}}}`);
      }
      this.index = varLen + 1
      this.templateinsert.patchValue({ text_header: tempdata });
    }
    this.index = 1

  }


  
  addvarbody(control) {
    if (this.templateinsert.controls[control].value == '') {
      this.index2 = 1;
    }
    else {
      var varLen = this.templateinsert.controls[control].value?.match(/{{/g)?.length
      this.index2 = varLen+1;

    }

    let el = this.index2++
    var obj = (this.templateinsert.controls['text_body'].value)+'<span>{{'+el+'}}</span>'
    this.templateinsert.patchValue({text_body:obj})

  }


  changeVariables2(event, control) {
    console.log(this.templateinsert);
    
  
      if (this.templateinsert.controls[control].value == '') {
        this.index2 = 1;
      }
      else {
        this.templateinsert.patchValue({text_body: event.htmlValue})
        var varLen;
        if(control == 'text_header'){
          varLen = this.templateinsert.controls[control].value.match(/{{/g)?.length
        }
        if(control == 'text_body'){
          varLen = this.templateinsert.controls[control].value.match(/{{/g)?.length

        }
        this.index2 = varLen
        var tempdata = this.templateinsert.controls[control].value;
        for (var i = 0; i < varLen; i++) {
          tempdata = tempdata.replace(tempdata.substr(tempdata.indexOf('{{'), 5), '~~~');
        }
        // varLen = varLen-1
        for (var i = 0; i < varLen; i++) {
          tempdata = tempdata.replace('~~~', `{{${i + 1}}}`);
        }
        this.index2 = varLen + 1
        this.templateinsert.patchValue({ text_body: tempdata });
      }
      this.index2 = 1
  
    }

    

  // addvarheader(){
  //   let el = this.index++
  //   console.log(el);
  //  var obj= (this.templateinsert.controls['text_header'].value)+'{{'+el+'}}'
  //  console.log(obj);
  //  this.templateinsert.patchValue({text_header:obj})
  // }

  // changeVariables(event){
  //   console.log(this.templateinsert.controls['text_header , text_body'].value);
  //   var varLen = this.templateinsert.controls['text_header, text_body'].value.match(/{{/g).length
  //   console.log(varLen);
  //   var tempdata = this.templateinsert.controls['text_header, text_body'].value;
  //   for(var i = 0; i < varLen; i++){
  //     tempdata = tempdata.replace(tempdata.substr(tempdata.indexOf('{{'), 5),'~~~');
  //   }
  //   for(var i = 0; i < varLen; i++){
  //     tempdata = tempdata.replace('~~~',`{{${i+1}}}`);
  //   }
  //   this.index = varLen+1
  //   console.log(tempdata);
  // this.templateinsert.patchValue({text_header:tempdata });
  // console.log(this.templateinsert.value);
  // }

 

//  addvarheader(control){
//     if (this.templateinsert.controls[control].value == '') {
//       this.index = 1;
//     }
//     else {
//       var varLen = this.templateinsert.controls[control].value.match(/{{/g)?.length
//       this.index = varLen;

//     }

//     let el = this.index++
//     console.log(el);
//    var obj= (this.templateinsert.controls['text_header'].value)+'{{'+el+'}}'
//    console.log(obj);
//    this.templateinsert.patchValue({text_header:obj})
//   }




  


// changeVariables(event, control) {
//   console.log(this.templateinsert);
  

//     if (this.templateinsert.controls[control].value == '') {
//       this.index = 1;
//     }
//     else {
//       var varLen = this.templateinsert.controls[control].value.match(/{{/g)?.length
//       this.index = varLen
//       var tempdata = this.templateinsert.controls[control].value;
//       for (var i = 0; i < varLen; i++) {
//         tempdata = tempdata.replace(tempdata.substr(tempdata.indexOf('{{'), 5), '~~~');
//       }
//       for (var i = 0; i < varLen; i++) {
//         tempdata = tempdata.replace('~~~', `{{${i + 1}}}`);
//       }
//       this.index = varLen + 1
//       this.templateinsert.patchValue({ text_header: tempdata });
//     }
//     this.index = 1

//   }

    










  




  check_for_submission() {

    


      var header=this.templateinsert.controls['text_header'].value
      var match = header.match(/{{(\d+)}}$/);
      var last_header = match[0]

      var body=this.templateinsert.controls['text_body'].value
      var match1 = body.match(/{{(\d+)}}<\/span>$/);

      var lastValue_body = match1? parseInt(match1[1]):null;
      




      this.templateinsert.patchValue({ number_variablel_header: last_header,number_variablel_body: lastValue_body});


    this.templateinsert.patchValue({ client_id: this.Client_Id });

    if (this.templateinsert.controls['media_type'].value == '' || this.templateinsert.controls['media_type'].value == 'text') {
      this.templateinsert.patchValue({ media: this.insidepath })
      if (this.templateinsert.value['header_type'] == 'none') {
        this.templateinsert.patchValue({ media_type: 'none' })
      }
      else if (this.templateinsert.value['header_type'] == 'text') {
        this.templateinsert.patchValue({ media_type: 'text' })
      }
      else {
        this.templateinsert.patchValue({ media_type: this.docvalue })
      }
      if (this.templateinsert.valid) {
        if (this.templateinsert.controls['temp_id'].value == '' || this.templateinsert.controls['temp_id'].value == null || this.templateinsert.controls['temp_id'].value == undefined) {
          this.submit_template('new')
        } else {
          this.submit_template('edit');
        }
      }
      else {
        this.findInvalidControls();
      }
    }

    else {
      if (this.media_url) {
        this.templateinsert.patchValue({ media: this.Client_Id + '/' + this.templateinsert.controls['template_name'].value + '.' + this.media_url.substr(this.media_url.lastIndexOf('.') + 1) })
        this.templateservice.insidefile_upload(this.formData).subscribe((data: any) => {
          this.insidepath = data;
        })
      }
      this.templateinsert.patchValue({ media_type: this.docvalue })

      if (this.templateinsert.valid) {
        if (this.templateinsert.controls['temp_id'].value == '' || this.templateinsert.controls['temp_id'].value == null || this.templateinsert.controls['temp_id'].value == undefined) {
          this.submit_template('new')
        } else {
          this.templateinsert.patchValue({ media_type: this.docvalue });
          this.submit_template('edit')
        }
      }
      else {
        this.findInvalidControls();
      }
    }
  }

  submit_template(state) {

    console.log(this.templateinsert.value);
    if (state == 'new') {




      // var header=this.templateinsert.controls['text_header'].value
      // var match = header.match(/{{(\d+)}}$/);
      // var last_header = match[0]

      // const body=this.templateinsert.controls['text_body'].value

      // const match1 = body.match(/{{(\d+)}}<\/p>$/);

      // const lastValue_body = match1 ? parseInt(match1[1]) : null;
      

      this.templateservice.submit_template(this.templateinsert.value).subscribe((data: any) => {
        var da = JSON.parse(data)
        if (da[0].auth == 'false') {
          this.messageservice.add({ severity: 'warn', summary: 'Warning..!', detail: da[1].Mess });
        }
        else if (da == '0') {
          this.messageservice.add({ severity: 'error', summary: 'Error..!', detail: 'Something went wrong, please try again later.' });
        }
        else {
          this.messageservice.add({ severity: 'success', summary: 'Success..!', detail: 'Template saved..!' });
          this.gettemplatedata()
          this.displayBasic = false;
        }
      })
    }
    else {
      this.templateservice.edittemplate(this.templateinsert.value).subscribe((data: any) => {
        var da = JSON.parse(data)
        if (da[0].auth == 'false') {
          this.messageservice.add({ severity: 'warn', summary: 'Warning..!', detail: da[1].Mess });
        }
        else if (da == '1') {
          this.messageservice.add({ severity: 'error', summary: 'Error..!', detail: 'Something went wrong, please try again later.' });
        }
        else {
          this.messageservice.add({ severity: 'success', summary: 'Success..!', detail: 'Template updated..!' });
          this.gettemplatedata()
          this.displayBasic = false
        }
      })
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
    this.header__type = " Edit Template"
    this.displayBasic = true
    this.templateinsert.patchValue(item)
    this.gettemplatedata();
    this.templateinsert.patchValue({ temp_id: item.id, media: item.media })
    this.imageSrc = 'http://192.168.1.123/botinpro/' + item.media
    this.templateinsert.patchValue({ header_type: item.header_type })
    this.headerType = item.header_type
    this.headerimage(item.media_type)
  }

  headerselect() {
    var ele = document.getElementById('headerType') as HTMLSelectElement;
    this.headerType = ele.value;
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
      }
    });
  }

  checkValue(event: any) {
    if (event.target.checked == true) {
      this.isphone = true;
    } else {
      this.isphone = false;
    }
  }

  checkwebsite(event: any) {
    if (event.target.checked == true) {
      this.iswebsite = true;
    } else {
      this.iswebsite = false;
    }
  }

  // image upload start form hear
  readURL(event) {
    const file = event.target.files[0];
    this.media_url = file.name
    if (file) {
      var ext = file.name.substr(file.name.lastIndexOf('.') + 1)
      var t = this.templateinsert.controls['template_name'].value
      // var c = this.templateinsert.controls['client_id'].value
      var c = this.Client_Id;
      var d = c + '/' + t + '.' + ext;
      this.formData.append(d, file)
    }
    // if (file.type == 'image') {
    // }
    // else if (file.type == 'doc') {
    // }
    // else {
    // }
    const reader = new FileReader();
    reader.onload = e => { this.imageSrc = reader.result; };
    reader.readAsDataURL(file);

  }

  resettemplateform() {
    this.templateinsert.reset();
    this.media_url = ''
    this.docvalue = ''
  }

  getStatusAcitve(Status = 'A') {
    this.templateservice.StatusApi(Status, this.Client_Id).subscribe((data: any) => {
      if (data != null && data != "") {
        var da = JSON.parse(data)
        this.Activedata = da
      }
    })
  }

  getdeletedata(Status = 'D') {
    this.templateservice.StatusApi(Status, this.Client_Id).subscribe((data: any) => {
      if (data != null && data != "") {
        var da = JSON.parse(data)
        this.deletedata = da
      }
    })
  }
}
