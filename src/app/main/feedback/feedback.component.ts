import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';

import { NgForm } from '@angular/forms/src/directives/ng_form';

import {UtilityService} from '../../core/services/utility.service'
import {AuthenService} from '../../core/services/authen.service';

declare var moment: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  
    public pageIndex: number = 1;
    public pageSize: number = 10;
    public totalRow:number;
    public filter:string = '';
    public entity: any;
    public feedbacks : any[];
  
    constructor(private _dataService: DataService, private _notificationService: NotificationService, private _utilityService : UtilityService, private _authenService : AuthenService ) { }
  
    ngOnInit() {
      this.loadData();
    }
  
    loadData(){
      this._dataService.get('/api/feedback/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) =>{
        this.feedbacks = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        for(var productCategory of this.feedbacks){
          productCategory.CreatedDate = moment(new Date(productCategory.CreatedDate)).format('DD/MM/YYYY');
        }
        console.log(response);
      });
    }
  
    loadProductCategory(id: any){
      this._dataService.get('/api/feedback/detail/' + id).subscribe((response: any)=>{
          this.entity = response;
      });
    }
  
    pageChanged(event : any): void{
      this.pageIndex = event.page;
      this.loadData();
    }
  
    public showAdd() {
      this.entity = {};
      this.addEditModal.show();
    }
  
    public showEdit(id:any){  
      this.loadProductCategory(id);
      this.addEditModal.show();
    }
  
    public saveChanges(form : NgForm){
      if(form.valid){
        if(this.entity.ID == undefined){
          this._dataService.post('/api/feedback/create', JSON.stringify(this.entity)).subscribe((response:any) =>{
            this.loadData();
            this.addEditModal.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
        }
        else{
          this._dataService.put('/api/feedback/update', JSON.stringify(this.entity)).subscribe((response:any) =>{
            this.loadData();
            this.addEditModal.hide();
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
        }
      }
    }
  
    deleteItem(id: any){
      this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
    }
  
    deleteItemConfirm(id:any){
      this._dataService.delete('/api/feedback/delete', 'id', id).subscribe((response: Response) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      });
    }

}
