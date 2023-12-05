import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommongridComponent } from './commongrid.component';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { InplaceModule } from 'primeng/inplace';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommongridComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule, 
    FormsModule,
    TableModule,
    InplaceModule,
    CalendarModule
  ],
  exports: [CommongridComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:[CommongridComponent],
  providers: [ConfirmationService]


})
export class CommongridModule { }
