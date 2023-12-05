import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedComponent } from './shared.component';
// import { CitymasterComponent } from './citymaster/citymaster.component';
// import { DataTablesModule } from 'angular-datatables';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactmasterComponent } from './contactmaster/contactmaster.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { BlocklistComponent } from './blocklist/blocklist.component';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { TemplatemasterComponent } from './templatemaster/templatemaster.component';
import {TabViewModule} from 'primeng/tabview';
import { MessageComponent } from './message/message.component';
import {EditorModule} from 'primeng/editor';
import {DropdownModule} from 'primeng/dropdown';
import { CommongridModule } from './commongrid/commongrid.module';
import { LanguagemasterComponent } from '../admin/languagemaster/languagemaster.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TemplatSechudelComponent } from './templat-sechudel/templat-sechudel.component';
import { AccordionModule } from 'primeng/accordion';

// import { LanguagemasterComponent } from './languagemaster/languagemaster.component';
// import { CommongridComponent } from './commongrid/commongrid.component';

@NgModule({
  declarations: [
    SharedComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    // CitymasterComponent,
    ContactmasterComponent,
    UsermasterComponent,
    BlocklistComponent,
    TemplatemasterComponent,
    MessageComponent,
    TemplatSechudelComponent,
    
    // LanguagemasterComponent
    
    // LanguagemasterComponent,
    // CommongridComponent,
    // CommongridComponent

  ],
  imports: [
    SharedRoutingModule,
    DialogModule,
    CommonModule,
    CommongridModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    TabViewModule,
    EditorModule,
    DropdownModule,
    ToastModule,
    ReactiveFormsModule,ConfirmDialogModule,AutoCompleteModule,AccordionModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
