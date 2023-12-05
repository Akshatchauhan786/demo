import { Component, OnInit } from '@angular/core';

import { TemplateService } from 'src/app/services/template.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators,FormControl, FormArray } from '@angular/forms';




@Component({
  selector: 'app-templat-sechudel',
  templateUrl: './templat-sechudel.component.html',
  styleUrls: ['./templat-sechudel.component.css']
})


export class TemplatSechudelComponent implements OnInit {


  formState:boolean;
  FormArray:any
  userdetails:any;
  template_document_baseurl: any;

  
    templatedata: any;
    formGroup: FormGroup;
    resultview:FormGroup

    







  constructor(public templateservice: TemplateService,private fb: FormBuilder) { }

  ngOnInit(): void {




    

    this.userdetails = JSON.parse(localStorage.getItem("userdetails"))

   this. gettemplateDate()

   this.template_document_baseurl = environment.documentUrl;
  //  this.initItemRows()


  }

  
gettemplateDate() {
  this.templateservice.gettemplateApprove_api(this.userdetails.Client_Id).subscribe((data: any) => {
    let objData = eval(data)
    this.templatedata = objData
    console.log(this.templatedata,'dddddddddddddd');
    
  })
  
}



templateinsert:any
imageSrc:any   
media_url:any
length_body:any

template_id(item:any){
  this.templateservice.gettemplateApproveEdit_api(this.userdetails.Client_Id,item.id).subscribe((data: any) => {
    this.templateinsert=JSON.parse(data);
    console.log(this.templateinsert);

    var header_text = this.templateinsert[0].text_header;
    console.log(header_text, 'text header');



    this.createForm();

    this.resultview.patchValue({header:header_text})

  //   this.createForm.patchValue({
  //     name: 'John',
  //     email: 'john@example.com'
  //   });
  // }
    



    var header = this.templateinsert[0].number_variablel_header.replace(/{/g,'').replace(/}/g, '');
    console.log(header);

    var body = this.templateinsert[0].number_variablel_body.replace(/{/g,'').replace(/}/g, '');
    console.log(body);

    for(var i = 0; i< body;i++){
      if(i==0){
        this.createForm();
        var formcontrol = <FormArray>this.resultview.controls['addvarable'];
        formcontrol.controls[i].patchValue({variable: '{{'+ (i+1) +'}}'})



        // this.resultview.controls['addvarable'].controls[''].patchValue({variable: '{{'+ i+1 +'}}'})
      }
      else{
        this.addResultId();
        var formcontrol = <FormArray>this.resultview.controls['addvarable'];
        formcontrol.controls[i].patchValue({variable: '{{'+ (i+1) +'}}'})
      }
    }
    this.imageSrc = 'http://192.168.1.123/botinpro/' + this.templateinsert[0].media
    

  })
  
}

initItemRows(){
  return this.fb.group({
    variable: new FormControl(''),
    value:new  FormControl(''),
    Fallback:new  FormControl(''),
   
  })
}

get formArr(){
  return this.resultview.get('addvarable') as FormArray;


}
createForm() {
  this.formState=true;
    this.resultview = this.fb.group({
      header: new FormControl(''),
      addvarable: this.fb.array([this.initItemRows()])
    })
  }
  addResultId(){
    this.formArr.push(this.initItemRows())

  }
}
