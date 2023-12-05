import { Component, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocklistComponent } from './blocklist/blocklist.component';
// import { CitymasterComponent } from './citymaster/citymaster.component';
import { ContactmasterComponent } from './contactmaster/contactmaster.component';
// import { LanguagemasterComponent } from './languagemaster/languagemaster.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { MessageComponent } from './message/message.component';
import { SharedComponent } from './shared.component';
import { TemplatemasterComponent } from './templatemaster/templatemaster.component';
import { UsermasterComponent } from './usermaster/usermaster.component';


const routes: Routes = [
  {
    path:'share',
    component:SharedComponent,
    children:[
      {path:'', component:MaincontentComponent},
      // {path:'main', component:MaincontentComponent},
      // {path:'citymaster', component:CitymasterComponent},
      // {path:'contactmaster',component:ContactmasterComponent},
      // {path:'usermaster', component:UsermasterComponent},
      {path:'blocklist', component:BlocklistComponent},
      {path:'templatemaster', component:TemplatemasterComponent},
      {path:'Message', component:MessageComponent},
      {path:'admin', loadChildren: ()=> import('../admin/admin.module').then(m => m.AdminModule)},
      // {path:'language', component:LanguagemasterComponent}
      
    ]


  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedRoutingModule { }
