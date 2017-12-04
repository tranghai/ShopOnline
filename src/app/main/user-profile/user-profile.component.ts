import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { UploadService  } from '../../core/services/upload.service';
import { SystemConstants } from '../../core/common/system.constants';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { LoggedInUser } from '../../core/domain/loggedin.user';
import { AuthenService } from '../../core/services/authen.service'; 


declare var moment: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('changePasswordModal') public changePasswordModal: ModalDirective;
  public userProfile: LoggedInUser;
  public baseAPI : string = SystemConstants.BASE_API;
  constructor(private _authenService : AuthenService, private _dataService: DataService, private _notificationService: NotificationService ) { }
  public entity: any;
  public entityChangePassword : any;
  public result : any;
  public newUserProfile : LoggedInUser;
  public OldPassword : string;
  public NewPassword : string;
  public ConfirmPassword : string;

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true,
    showDropdowns: true
  };

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userProfile = this._authenService.getLoggedInUser();
    console.log(this.userProfile)
  }l
  loadUserDetail(id: any){
    this._dataService.get('/api/appuser/detail/' + id)
    .subscribe((response: any) => {
      this.entity = response;
      this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
    });
  }

  showModal(id: any) {
    this.loadUserDetail(id);
    this.addEditModal.show();
  }

  showChangePasswordModal(){
    this.entityChangePassword = {};
    this.OldPassword = '';
    this.NewPassword = '';
    this.ConfirmPassword = '';
    this.changePasswordModal.show();
  }

  saveChanges(form: NgForm) {
    if (form.valid) {
      this.saveData(form);
    }
  }

  changePasswordMethod(form: NgForm){
    if(form.valid){
      this.entityChangePassword.OldPassword = this.OldPassword;
      this.entityChangePassword.NewPassword = this.NewPassword;
      this.entityChangePassword.ConfirmPassword = this.ConfirmPassword;

      this._dataService.post('/api/appuser/changepassword', JSON.stringify(this.entityChangePassword))
        .subscribe((response: any)=>{
          this.result = response;
          if(this.result == "Succeeded"){
            this.changePasswordModal.hide();
            form.resetForm();
            this._notificationService.printSuccessMessage("Đổi mật khẩu thành công");
          }
          else{
            form.resetForm();
            this._notificationService.printErrorMessage("Đổi mật khẩu không thành công");
          }
        });
    }
  }

  saveData(form: NgForm){
    this._dataService.put('/api/appuser/update', JSON.stringify(this.entity))
    .subscribe((response: any) => {
      let gender : boolean;
      response.access_token = this.userProfile.access_token;

      response.Roles = this.userProfile.roles;
      this.newUserProfile = new LoggedInUser(response.Id, response.access_token, response.UserName, response.FullName, response.Email, response.Avatar, response.Address,
        response.BirthDay, response.PhoneNumber, response.Gender, response.Status, response.Roles);
        console.log(this.newUserProfile);
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(this.newUserProfile));
      this.loadData();
      this.addEditModal.hide();
      form.resetForm();
      this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
    }, error => this._dataService.handleError(error));
  }

  public selectGender(event) {
    this.entity.Gender = event.target.value;
  }
  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }
}
