import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import { SharedModule } from './shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';






@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegistrationComponent,
        
       
    ],
    imports: [
        CommonModule,
       
        BrowserModule,
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule, 
        ReactiveFormsModule, 
        FormsModule,
        ToastModule,
        AppRoutingModule,
        DropdownModule,AutoCompleteModule,NgxUiLoaderModule,AccordionModule,ButtonModule,
        NgxUiLoaderHttpModule.forRoot({showForeground: true,} ),
  ],
    providers: [MessageService, ConfirmationService],
    bootstrap: [AppComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    exports:[NgxUiLoaderModule,NgxUiLoaderHttpModule]
   
})
export class AppModule { }
