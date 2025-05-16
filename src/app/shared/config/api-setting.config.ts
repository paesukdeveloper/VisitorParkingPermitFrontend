import { environment } from '../../../environments/environment'

const API_GATEWAY_URL = environment.apiUrl;

export const apiUrlSetting = {
    ApiMethods: {
        account_modules: {
            login: 'Login/Login',
            refresh_token: 'login/refreshToken',
            loginWithOTP: 'Login/LoginWithOTP',
            resendCode: 'Login/ResendCode'
          },
          forgot_password: {
            forgotPassword: 'account/ForgotPassword',
            resetPassword: 'account/ResetPassword',
            changePassword: 'Account/ChangePassword',
            changeExpiredPassword: 'account/ChangeExpiredPassowrd'
          },
          councilsetup: {
            getCouncilDetails: "config/CouncilSetup",
          },
          dropdown: {
            getUserPrefix: 'DropDown/GetUserPrefix',
            getVoucherType: 'DropDown/vouchertype',
            getPermitType: 'DropDown/permitType',
            getAddressByPostCode: "DropDown/GetAddressByPostCode",
            getDocumentNameByEvidenceProof: "DropDown/GetDocumentNameByEvidence",
            getDocumentEvidenceProof: 'dropdown/documentevidenceproof',
            getVehicleMake: 'dropdown/GetVehicleMake',
            getVehicleColour: 'dropdown/GetVehicleColour',
            getFuelTypeList: 'dropdown/fuelType',
            getVoucherList :"DropDown/GetVoucherList",
            getVoucherRedeemList: "DropDown/GetVoucherRedeemList",
            getDocumentName: 'dropdown/GetDocumentName',
            getPermitStatus: 'dropdown/GetPermitStatus',
            getPermitPeriod: 'dropdown/GetPermitPeriod',
            getDocNamePermitDetailsAlias:"DropDown/GetDocNamePermitDetailAlias",
            getReason: "DropDown/GetReasonMaster",
            getAllLocationId: "DropDown/locationIdAddress",
            //waste
            wasteType: "DropDown/wastetype",
            GetWasteTariffDropwon: "DropDown/environmentPermitTariffSetup",
            getGlobalPasswordPolicy: "DropDown/GetGlobalPasswordPolicy", 
            getAllPostcode:'DropDown/GetAllPostCode',
          },
          registration:{
            registerUser:'Registration/SaveCustomerRegistration'
          },
          user: {
            saveUsers: 'user/SaveUser',            
            userProfile: 'user/UserProfileDetails'    ,
            uploadPhoto: 'document/upload',
            userProgfileById: 'User/GetUserDetailsById',   
            getUserApplicationCount: "User/GetUserApplicationCountById",
            searchUserUsingEmail: "User/SearchExistingUserByEmail" 
          },
          voucher: {
            UploadVoucherDocument: "document/uploadVoucherPermitDocument",
            saveVoucher: "voucher/SaveVoucher",
            getVoucherApprovalsByVoucherTypeId: "VoucherApproval/GetVoucherApprovalsByVoucherTypeId",
            getCustomerVouchersList: "Voucher/GetCustomerVouchersList",
            getVoucherApprovalById: "Voucher/GetVoucherApprovalById",
            getVoucherByUserId: "Voucher/GetVoucherByUserId",
            SaveVoucherAppproval: "Voucher/SaveVoucherAppproval",
            GetVoucherDetail: "Voucher/GetVoucherDetail",
          },
          permit: {
            getTemDataForPermit: "PurchasePermitCustomer/GetTemporaroryData",
            UploadDocument: "document/uploadVoucherPermitDocument",
            savePermit: "PermitApplication/SavePermitApplication",
            getPermitDetails:"PermitApplication/GetPermitDetailsById",
            GetDVLADetails: 'PermitApplication/GetDVLADetails',
            getPermitApprovalList: 'PermitApproval/GetPermitApprovalList',
            getPermitApprovalListById: 'PermitApproval/GetPermitApprovalById',
            deletePermitApplicationDocument :"/api/PermitApproval/DeletePermitApplicationDocument",
            getPermitsfromTariff: "PermitApproval/GetPermits",
            getPermitTariffCost: "PermitApproval/GetPermitTariffCost",
            getTariffTypeForPermit:'DropDown/GetPermitTariffSpecificationPermit',
            transactionInitForAddPermit: "PermitApplication/TransactionInitPermitApplication",
            transactionHistoryForAddPermit:  "PermitApplication/SaveTransactionHistoryPermitApplication",
            savePermitApplication: "PermitApproval/SavePermitApplication",
            permitPaymentHistory: "PermitApproval/PaymentHistory",
            permitHistory: "PermitApproval/PermitHistory",
            cancelCourtesyCar: "PermitApproval/CancelCourtesyCar",
            transactionInitForNewPermitApproval :  "PermitApplication/TransactionInitPermitApplicationApproval",
            transactionHistoryForNewPermitApproval:  "PermitApplication/SaveTransactionHistoryPermitApplicationApproval",
            GetDVLADetailsTotalCost: "PermitApproval/GetDVLADetailTotalCost",
            GetPermitRefundAmount: "PermitApproval/PermitRefund",
            backOfficePaymentForRefund: "PermitApproval/BackofficeRefund",
            cancelStatus: "PermitApproval/CancelStatus",
            GetPermitLogs: "PermitApproval/GetLogs",
            ApplyPurchasePermit: "PurchasePermitCustomer/ApplyPurchasePermit",
            getIntermediatePermitDetailsById: "PurchasePermitCustomer/GetIntermediatePermitDetailsById",
            permitPurchaseIntermediateOnline: "PurchasePermitCustomer/TransactionInitPermitCustomer",
            saveTransactionHistoryIntermediatePermit: "PurchasePermitCustomer/SaveTransactionHistoryPermitCustomer",
            GetPermiDetailsByUserId: "PurchasePermitCustomer/GetPermitDetailsByUserId",
            transactionInitForNewAddress:'PurchasePermitCustomer/TransactionInitPermitAddressCustomer',
            saveTrancitionHistoryForNewAddress : "PurchasePermitCustomer/TransactionInitPermitAddressCustomer",
            transitionInitForPermit: 'PermitPurchase/TransactionInitPermit',
            transactionInitForRegisterAndCourtesy: 'PurchasePermitCustomer/TransactionInitPermitRegistrationCourtesyCustomer',
            saveTrancitionHistoryForRegisterAndCourtesy :'PurchasePermitCustomer/SaveTransactionHistoryPermitRegistrationCourtesyCustomer',
            GetCustomerPermitList: 'PurchasePermitCustomer/GetCustomerPermitList',
            transactionInitForPermitRenewal: "PurchasePermitCustomer/TransactionInitPermitRenewalCustomer",
            updateAliasAddress: "PurchasePermitCustomer/UpdateAliasAddress",
            GetEnvironmentTariffCost: "PermitApplication/GetEnvironmentTariffCost",
            wasteTypeDropdown: "PermitApplication/GetWasteTypeDropDown",
            NoOfBinsDropDown: "PermitApplication/GetBinsDropDown",
            GetPermitTypeDetails: "PermitApplication/GetPermitTypeDetailsById",
            getPermitPaymentREciept: "PermitApproval/GetPermitPaymentReciept",
            checkAddressZoneTariff: "PermitApproval/CheckAddressZoneTariff",
            saveCourtesyCarWithZero:"PurchasePermitCustomer/SavePermitPurchaseTransactionData"
          },
          cashless: {
            GetCashlessVoucherDetailsByUserId: "CashlessVoucher/GetCashlessVoucherDetailsByUserId",
            SaveCashlessVoucher:"CashlessVoucher/SaveCashlessVoucher",
            AddVehicleDetailsCashless: "CashlessVoucher/AddVehicleDetails",
            GetVechDetails: "CashlessVoucher/VehicleDetails",
            GetVrmDropdown: "CashlessVoucher/GetVrmDropdown",
            GetParkingDuration: "CashlessVoucher/GetParkingDurationDropdown",
            GetCashlessVoucherTariffCost: "CashlessVoucher/GetCashlessVoucherTariffCost",
            TransactionInitCashlessVoucher: "CashlessVoucher/TransactionInitCashlessVoucher",
            paymentHistory: "CashlessVoucher/CashlessVoucherPaymentHistory",
            deletevehicle: "CashlessVoucher/DeleteVehicle"
          },
          AFDForAddress: {
            getAFDaddress: "AddressApi/GetAFDaddress"
          },
          voucherApproval: {
            getVoucherTariff: "VoucherApproval/GetVoucherTariff",
            getDVLADetails: "PermitApplication/GetDVLADetails",
            GetVoucherRedeemData: "VoucherApproval/GetVoucherRedeemData",
            SaveVoucherBookRedeem: "VoucherApproval/SaveVoucherBookRedeem",
            DeleteVoucherBookRedeem: "VoucherApproval/DeleteVoucherBookRedeem",
            SaveSingleVoucherPurchase: "VoucherApproval/SaveSingleVoucherPurchase",
            DeleteSingleVoucherPurchase: "VoucherApproval/DeleteSingleVoucherPurchase",
            getSingleVoucherList: "VoucherApproval/GetSingleVoucherList",
            GetPaymentHistoryList: "VoucherApproval/GetPaymentHistoryList",
            GetScratchVoucherPurchaseList: "VoucherApproval/GetScratchVoucherPurchaseList",
            GetVoucherPaymentReciept: "VoucherApproval/GetVoucherPaymentReciept",
            getVoucherTariffCost: "VoucherApproval/GetVoucherTariffCost"
          },
          VoucherPurchase: {
            transactionInit: "VoucherPurchase/TransactionInit",
          },
          Registration: {
            GetCashlessDetails: "Registration/GetCashlessDetails"
          },
          webpage: {
            getWebpage: "webpage/webpages",
            saveWebPage: "webpage/webpage",
            updateActiveStatusWebpage: "webpage/status",
            getWebPageById: 'webpage/GetWebPagesById',
            getWebPageTermsAndConditionsById: "WebPage/GetWebPageTermsAndConditionsById"
          },
          PCNStatus: {
            GetPcnStatus:"PCNStatus/GetPcnStatus",
            savePcnStatus:"PCNStatus/savepcnstatus",
            FetchPCNDetails:"PCNStatus/FetchPCNDetails",
            UpdateActiveStatusPcnStatus:"PCNStatus/Status",
            GetPcnStatusDropDown:"PCNStatus/GetPcnStatusDropDown",   
          },
          MOTVED: {
            GetMOTVEDDetails:"MOTVED/GetMOTVEDDetails",
            ViewMOTVEDDetails:"GetUpdateMotVed/GetMotVed",
            SaveMOTVEDDetails:"GetUpdateMotVed/UpdateMotVed",
          },
          Visitor: {
            saveVisitorVrm : "Visitor/SaveVrmRegistration",
            GetVisitorVoucherByLocationId : "Visitor/GetVisitorVoucherByLocationId"
          }
         
    }
}