import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../../core/domain/loggedin.user'
import { SystemConstants } from '../../core/common/system.constants';
import { AuthenService } from '../../core/services/authen.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public userProfile: LoggedInUser;
  public baseAPI : string = SystemConstants.BASE_API;
  
  constructor(private _authenService : AuthenService) { }

  ngOnInit() {
    this.userProfile = this._authenService.getLoggedInUser();
    console.log(this.userProfile);
  }

}
