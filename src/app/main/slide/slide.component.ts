import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';

import { NgForm } from '@angular/forms/src/directives/ng_form';

import { UtilityService } from '../../core/services/utility.service'
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';
import { UploadService } from '../../core/services/upload.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('image') image;

  public baseFolder: string = SystemConstants.BASE_API;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalRow: number;
  public filter: string = '';
  public entity: any;
  public slides: any[];

  constructor(private _dataService: DataService, private _notificationService: NotificationService, private _utilityService: UtilityService,
     private _authenService: AuthenService, private _uploadService: UploadService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/slide/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.slides = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        console.log(response);
      });
  }

  loadProductCategory(id: any) {
    this._dataService.get('/api/slide/detail/' + id).subscribe((response: any) => {
      this.entity = response;
    });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  public showAdd() {
    this.entity = {};
    this.addEditModal.show();
  }

  public showEdit(id: any) {
    this.loadProductCategory(id);
    this.addEditModal.show();
  }

  public saveChanges(form: NgForm) {
    if (form.valid) {
      let fi = this.image.nativeElement;
      if(fi.files.length > 0){
        this._uploadService.postWithFile('/api/upload/saveImage?type=banner', null, fi.files)
          .then((imageUrl: string) => {
            this.entity.Image = imageUrl;
          }).then(() =>{
            this.saveData(form);
          });
      }
      else {
        this.saveData(form);
      }
    }
  }

  private saveData(form:NgForm){
    if (this.entity.ID == undefined) {
      this._dataService.post('/api/slide/create', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.loadData();
        this.addEditModal.hide();
        form.resetForm();
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/slide/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.loadData();
        this.addEditModal.hide();
        form.resetForm();
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/slide/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
}
