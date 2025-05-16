import { Component, OnInit } from '@angular/core';
import { ModuleModel } from '../../../../models/modules';
import { MenuDetails } from '../../../dummy-data/menuData';
import { Router } from '@angular/router';
import { CommonDataPassingService } from '../../../shared/services/common-data-passing.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../../shared/auth/auth.service';
export interface UserDeatil {
  fullName?: string,
  profilePhoto?: string
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  currentModule: ModuleModel | undefined;
  modulesDetails: any[] = MenuDetails;
  userDetail: UserDeatil = {};
  latter = '';
  isDropdownVisible = false;
  constructor(private route: Router,
    private dataService: CommonDataPassingService,
    private authenticationService: AuthService,
    private service: UserService
  ) {
    this.getProfileDetail()
  }
  getProfileDetail() {
    const userDetails = JSON.parse(localStorage.getItem('userDeatils')!);
    
    this.service.GetuserProfileDetails(userDetails.encId)
    .subscribe((data:any)=>{       
      this.userDetail.fullName =  data.Data.userDataModel.firstName &&  data.Data.userDataModel.surName ?  data.Data.userDataModel.firstName + ' ' + data.Data.userDataModel.surName: "";
    });
    this.userDetail.profilePhoto = userDetails?.profileImage;
    this.latter = userDetails?.firstName.charAt(0) + userDetails?.surName.charAt(0);
  }
  onLogoutClick() {
    this.authenticationService.logout();
  }
 
}
