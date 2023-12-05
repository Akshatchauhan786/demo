import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CitymasterComponent } from './citymaster/citymaster.component';
// import { CommongridComponent } from '../shared/commongrid/commongrid.component';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LanguagemasterComponent } from './languagemaster/languagemaster.component';
import { CommongridModule } from '../shared/commongrid/commongrid.module';
import { ApprovallistComponent } from './approvallist/approvallist.component';
import { LicenseConfigurationComponent } from './license-configuration/license-configuration.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';






@NgModule({
  declarations: [
    CitymasterComponent,
    // CommongridComponent,
    LanguagemasterComponent,
    ApprovallistComponent,
    LicenseConfigurationComponent
    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommongridModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,InputTextModule
    

    // BrowserModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
