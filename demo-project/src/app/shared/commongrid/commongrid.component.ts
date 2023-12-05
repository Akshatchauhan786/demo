import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommanService } from '../comman.service';
import { ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-commongrid',
  templateUrl: './commongrid.component.html',
  styleUrls: ['./commongrid.component.css']

})
export class CommongridComponent implements OnInit, OnDestroy {

  @Input() cols: any[];
  @Input() values: any[];
  @Input() gridID:string;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() statusEvent = new EventEmitter<string>();
  @Output() Approval = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<string>();
  @Output() resetpasswordEvent = new EventEmitter<string>();
  @Output() renewLicense = new EventEmitter<any>();
  @Output() Block_list = new EventEmitter<any>();
  @Output() RowSelect = new EventEmitter<any>();


  selectlength:any

  RenewalDate:any
  duration:any
  gridId:string = '';
  globalfilter: any[]=[]
  index: any;
  selectedvalue: any;

  constructor(public comman: CommanService,private confirmationService: ConfirmationService, private messageService : MessageService){}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    for (var i = 0; i < this.cols.length; i++) {
      this.globalfilter.push(this.cols[i].id)
    }
  }

// statusItem(id:any){

//   this.statusEvent.emit(id);
// }

statusItem(id:any){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.statusEvent.emit(id);
        this.messageService.add({severity:'success', summary:'Confirmed', detail:'You have accepted'});
    },
    reject: (type) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
    }
});

}


editItem(data:any){
  this.editEvent.emit(data);
}


Approve_reject_user(data:any, status){

  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.Approval.emit([data, status]);
        this.messageService.add({severity:'success', summary:'Confirmed', detail:'You have accepted'});
    },
    reject: (type) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
    }
});

}


RestPassword(data:any){
  this.resetpasswordEvent.emit(data);
}

deleteItem(id:any){
  this.deleteEvent.emit(id);
}


confirm1(item:any) {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteItem(item);
          this.messageService.add({severity:'success', summary:'Confirmed', detail:'You have accepted'});
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
}

get_duration(end_date){
  var currentDate = new Date();
  var endDate = new Date(end_date)
  var duration = Math.floor((Date.parse(endDate.toString()) - Date.parse(currentDate.toString())) / 86400000);
  this.duration = duration
  if(duration >0){ return (duration + ' Days'); }
  else{ return ('0 Days'); }
}


updateLicenseDetails(client_id){
  this.renewLicense.emit([client_id, this.RenewalDate])
}


blocklist_conformation(item:any) {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(item);
        this.Block_list.emit([item]);
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
}
onRowSelect(event){
//  console.log(event);
// console.log( this.selectedvalue);
this.selectlength=this.selectedvalue.length
this.index=event.index+1
// this.RowSelect.emit(this.index)
this.RowSelect.emit(this.selectlength)

}
}

