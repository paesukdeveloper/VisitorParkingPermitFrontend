import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonDataPassingService } from '../../../../shared/services/common-data-passing.service';
import { UserService } from '../../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { noWhitespaceValidator } from '../../../../../validators/nospacevalidator';
import { EncryptionService } from '../../../../helpers/security/encryption.service';
import { HttpStatusCodes } from '../../../../shared/enums/http-status-codes.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { LANG_EN_TRANS } from '../../../../shared/translate/lang-en';
import configuration from '../../../../../assets/config.json'
import { first } from 'rxjs';
import { ApiResponse } from '../../../../../shared/models/APIResponse';
import { CouncilSetupService } from '../../../services/council-setup/council-setup.service';
@Component({
  selector: 'app-signup-type',
  templateUrl: './signup-type.component.html',
})
export class SignupTypeComponent implements OnInit {
  userForm!: FormGroup;
  userPrefixData: any;
  passwordVisible: boolean = false;
  passwordcfnVisible: boolean = false; // for password show/hide
  passwordFieldType: string = 'password';// for password show/hide
  cfnPasswordFieldType: string = 'password';// for password show/hide
  isNewPasswordShow = false;
  isCnfPasswordShow = false;
  Formshow: boolean = false;

  voucherTypeData: any;
  permitTypeData: any;
  globalPasswordData: any;
  registrationName: string = "";
  registrationId: string = "";
  registrationType: number = 0;

  errMsgPassword: string[] = [];

  isUserEmailExists: boolean= false

  isCashlessAllowed:boolean = true

  constructor(private dataService: CommonDataPassingService,
    private formBuilder: FormBuilder,
    private service: UserService,
    private loader: NgxSpinnerService,
    private toaster: ToastrService,
    private route: Router,
    private encryption: EncryptionService,
    private councilService: CouncilSetupService

  ) {

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      title: ['', [Validators.required, noWhitespaceValidator]],
      firstName: ['', [Validators.required, noWhitespaceValidator]],
      surName: ['', [Validators.required, noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9,*]*$'), noWhitespaceValidator]],
      password: ['', [Validators.required, noWhitespaceValidator]],
      cnfPassword: ['', [Validators.required, noWhitespaceValidator]]
    }, {
      validators: this.passwordMatchValidator("password", "cnfPassword")
    });
    this.getInitialData();
    this.getCashlessRights()
  }

  passwordMatchValidator(password: string, cnfPassword: string) {
    return (formGroup: FormGroup) => {
      let Pass = formGroup.controls[password];
      let CPass = formGroup.controls[cnfPassword];
      if (
        CPass.errors &&
        !CPass.errors['passwordMismatch']
      ) {
        return;
      }
      if (Pass.value !== CPass.value) {
        CPass.setErrors({ passwordMismatch: true });
      } else {
        CPass.setErrors(null);
      }
    };
  }

  getInitialData() {
    this.loader.show();
    this.service.getInitialData(encodeURIComponent(this.encryption.OpenSSLEncrypt(configuration.councilName))).subscribe({
      next: (data: any) => {
        this.userPrefixData = data[0].Data;
        this.voucherTypeData = data[1].Data;
        this.permitTypeData = data[2].Data;
        this.globalPasswordData = data[12].Data;
        this.loader.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.loader.hide();
        if (error.status === 401) {
          this.toaster.error('Unauthorized access. Please log in again.');
          this.route.navigate(['/login']);
        } else {
          this.toaster.error('An error occurred while fetching data.');
        }
      }
    });
  }

  showNewPassword() {
    this.isNewPasswordShow = !this.isNewPasswordShow;
    this.passwordFieldType = this.isNewPasswordShow ? 'text' : 'password';
  }

  showCnfPassword() {
    this.isCnfPasswordShow = !this.isCnfPasswordShow;
    this.cfnPasswordFieldType = this.isCnfPasswordShow ? 'text' : 'password';
  }

  onShow(type: number, typeId: string, typeName: string) {
    this.registrationId = typeId;
    this.registrationName = typeName;
    this.registrationType = type;
    this.Formshow = true;
  }

  onHide() {
    this.userForm.reset();
    this.userForm.controls['title'].setValue("");
    this.Formshow = false;
  }
  onShowCashless(){
    this.registrationName = "Cashless Voucher";
    this.Formshow = true;
  }
  onCashlessHide() {
    this.Formshow = false;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  saveUserDetails() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }
    let isValid = this.passwordValid(this.userForm.controls['password'].value);
    if (!isValid) {
      return;
    }
    else {
      this.loader.show();
      const formData = this.userForm.value;

      const updatedUserDataModel = {
        userPrefixId: formData.title,
        firstName: formData.firstName,
        surName: formData.surName,
        emailAddress: formData.email,
        contactNumber: formData.contactNo,
        password: formData.password,
        confirmPassword: formData.cnfPassword,
        registrationId: this.registrationId,
        registrationType: this.registrationType
      };

      let temporaryRegistrationDataModel = {};

      if (this.registrationType == 1) {
          temporaryRegistrationDataModel = {"voucherTypeId" : this.registrationId};
      } else {
          if (this.registrationId === "") {
              temporaryRegistrationDataModel = { IsCashlessVoucher: true , "voucherTypeId" : 0,"permitTypeId" : 0 };
          } else {
            temporaryRegistrationDataModel = {"permitTypeId" : this.registrationId};
          }
      }
    
      const requestData = {
        userDataModel: updatedUserDataModel,
        userPasswordpolicyModel: {
          "id": 0,
          "encId": "string",
          "minLength": 0,
          "maxLength": 0,
          "minUppercase": 0,
          "minNo": 0,
          "minSpecialCharacter": 0,
          "canUseOldPwd": true,
          "expiryDays": 0,
          "failedAttempts": 0
        },
        temporaryRegistrationDataModel:temporaryRegistrationDataModel,
      };

      this.service.saveRegisterUserDetails(requestData).subscribe({
        next: (response) => {
          if (response.Status === HttpStatusCodes.SuccessOK || response.Status === 0) {
            this.toaster.success(response.Message);
            this.route.navigate(['']);
          }
          this.loader.hide();
        },
        error: error => {
          this.toaster.error(error.error);
          this.loader.hide();
        },
        complete: () => {
          this.loader.hide();
        }
      });
    }
  }


  passwordValid(password: string) {
    this.errMsgPassword = [];
    let isValid = true;
    if (password.length < this.globalPasswordData.minLength) {
      this.errMsgPassword.push(LANG_EN_TRANS.Minimum_Password_Length_is_required + this.globalPasswordData.minLength);
      isValid = false;
    }
    if (password.length > this.globalPasswordData.maxLength) {
      this.errMsgPassword.push(LANG_EN_TRANS.Max_Password_Length_is_required + this.globalPasswordData.maxLength);
      isValid = false;
    }
    if ((password.match(/[A-Z]/g) || []).length < this.globalPasswordData.minUppercase) {
      this.errMsgPassword.push(LANG_EN_TRANS.UpperCase_Password_Length_is_required.replace("{0}", this.globalPasswordData.minUppercase));
      isValid = false;
    }
    if ((password.match(/[0-9]/g) || []).length < this.globalPasswordData.minNo) {
      this.errMsgPassword.push(LANG_EN_TRANS.Numeric_Password_Length_is_required.replace("{0}", this.globalPasswordData.minNo));
      isValid = false;
    }
    if ((password.match(/[^A-Za-z0-9]/g) || []).length < this.globalPasswordData.minSpecialCharacter) {
      this.errMsgPassword.push(LANG_EN_TRANS.Special_Characters_Password_Length_is_required.replace("{0}",this.globalPasswordData.minSpecialCharacter));
      isValid = false;
    }
    return isValid;
  }

   //seraching user using email
   SearchUserUsingEmail(){
    const userEmail  = this.userForm.get('email')?.value 
    const  reqBody =  {
        emailAddress: userEmail ?? "",
        title: "",
        firstName: "",
        lastName: "",
        contact: "",
        isPermitExists: false,
        isCashlessExists: false,
        isVoucherExists: false
      }
 
    this.service.SearchExistingUserByEmail(
    encodeURIComponent(this.encryption.OpenSSLEncrypt(configuration.councilName)), 
    reqBody)
    .subscribe((response:any) => {
      if(response.Status == 200 && response.Data !=null){
      const title  = this.userPrefixData.find((item:any) => item.value == response.Data.title)
      this.userForm.patchValue({
        title: title.key,
        firstName:  response.Data.firstName,
        lastName: response.Data.lastName,
        email: response.Data.emailAddress,
        phoneNo:  response.Data.contact})
        this.toaster.error("User is already registered in the system with this email, please use another email");
        this.isUserEmailExists = true
      }
      else{
        this.isUserEmailExists = false
      }
      
    })
  }


  //For cashless
  getCashlessRights(){
    this.councilService.GetCashlessDetails(encodeURIComponent(this.encryption.OpenSSLEncrypt(configuration.councilName)))
    .pipe(first())
    .subscribe({
      next: (response: ApiResponse) => { 
       if(!response.Data){
        this.isCashlessAllowed = false
       }
       else{
        this.isCashlessAllowed = true
       }
      }
    });
  }

}
