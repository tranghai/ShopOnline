import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { UploadService  } from '../../core/services/upload.service';
import { SystemConstants } from '../../core/common/system.constants';
import { NgForm } from '@angular/forms/src/directives/ng_form';

declare var moment: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('avatar') avatar;
  constructor(private _dataService: DataService, private _notificationService : NotificationService, private _uploadService: UploadService) { }

  public myRoles:string[] = [];
  public pageIndex:number = 1;
  public pageSize:number = 10;
  public totalRows:number;
  public filter:string = '';
  public entity: any;
  public baseFolder: string = SystemConstants.BASE_API;
  public users: any[];
  public allRoles: IMultiSelectOption[] = [];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    showDropdowns: true
  };

  ngOnInit() {
    this.loadData();
    this.loadRoles();
  }

  loadData(){
    this._dataService.get('/api/appuser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any)=> {
          this.users = response.Items;
          this.pageIndex = response.PageIndex;
          this.pageSize = response.PageSize;
          this.totalRows = response.TotalRows;
          console.log(this.users);
      });
  }

  loadRoles() {
    this._dataService.get('/api/approle/getall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }
  loadUserDetail(id: any) {
    this._dataService.get('/api/appuser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        this.myRoles = [];
        for (let role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  showAddModal() {
    this.entity = {};
    this.addEditModal.show();
  }
  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.addEditModal.show();
  }
  saveChanges(form: NgForm) {
    if (form.valid) {
      this.entity.Roles = this.myRoles;
      let fi = this.avatar.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=avatar', null, fi.files)
        .then((imageUrl: string) => {
          this.entity.Avatar = imageUrl;
        }).then(() => {
          this.saveData(form);
        });
      }
      else {
        this.saveData(form);
      }
    }
  }
  private saveData(form: NgForm) {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appuser/create', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.addEditModal.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/appuser/update', JSON.stringify(this.entity))
        .subscribe((response: any) => {
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
    this._dataService.delete('/api/appuser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
  public selectGender(event) {
    this.entity.Gender = event.target.value;
  }
  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }
}
