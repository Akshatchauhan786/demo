import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactmasterComponent } from '../shared/contactmaster/contactmaster.component';
import { TemplatSechudelComponent } from '../shared/templat-sechudel/templat-sechudel.component';
import { UsermasterComponent } from '../shared/usermaster/usermaster.component';
import { ApprovallistComponent } from './approvallist/approvallist.component';
import { CitymasterComponent } from './citymaster/citymaster.component';
import { LanguagemasterComponent } from './languagemaster/languagemaster.component';
import { LicenseConfigurationComponent } from './license-configuration/license-configuration.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'citymaster', component: CitymasterComponent},
      {path: 'languagemaster', component: LanguagemasterComponent},
      {path: 'contactmaster', component: ContactmasterComponent},
      {path: 'usermaster', component: UsermasterComponent},
      {path: 'approvelist', component: ApprovallistComponent},
      {path: 'license', component: LicenseConfigurationComponent},
      {path: 'templatesechudle', component: TemplatSechudelComponent},






    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
