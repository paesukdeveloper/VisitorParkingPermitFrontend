import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitorParkingService } from '../../services/VisitorParking/visitor-parking.service';
import { QrDataTransferService } from '../../services/qrDataTransfer/qr-data-transfer.service';
import { ToastrService } from 'ngx-toastr';

interface ParkingDurationOption {
  id: string;
  duration: string; 
  amount: string;
  label?: string;  
}

@Component({
  selector: 'app-qr-landing-page',
  templateUrl: './qr-landing-page.component.html',
  styleUrl: './qr-landing-page.component.scss'
})
export class QrLandingPageComponent {
  vrm = '';
  locationId: string = '';
  locationAddress = '';
  plate = '';
   parkingDuration: ParkingDurationOption[] = [];
  selectedDuration: ParkingDurationOption | null = null;
  vehicleVerified = false;
  summaryData: any = {};
  maxParkingDuration: string = ""
  formattedMaxParkingDuration: string = ""
  endTime : string = ""
  dateAndTime:Date = new Date();
  totalAmount: string  = ""
  showVrmError = false;
  parkingSlotsAvailable : number = 0

  arrivalDateTime: string = ''; // Bind to datetime-local input
  constructor(private route: ActivatedRoute, private visitorService: VisitorParkingService, private qrDataTransfer: QrDataTransferService
    ,private toaster: ToastrService,private router: Router,
  ) {}

  ngOnInit() {
    
    const code = this.route.snapshot.queryParamMap.get('locationId');
    this.locationId = code ?? ""

    this.GetVisitorVoucherByLocationId()

    const now = new Date();
    this.arrivalDateTime = this.formatDateForInput(now);
   this.updateArrivalTime(new Date(this.arrivalDateTime));
  }


  formatDateForInput(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

onArrivalTimeChange() {
  const selectedDate = new Date(this.arrivalDateTime);
  this.updateArrivalTime(selectedDate);
  this.endTime = ""
  this.selectedDuration = null
}

updateArrivalTime(date: Date) {
  this.dateAndTime = date;
}


  verifyPlate() {
    if (!this.vrm || this.vrm.trim() === '') {
        this.showVrmError = true;
        return;
      }
    this.showVrmError = false;
    
    if(this.totalAmount !=""){

      const qrData = {
      vrm: this.vrm,
      locationId: this.locationId,
      locationAddress: this.locationAddress,
      startDate: this.dateAndTime.toISOString(),
      endTime: this.endTime,
      totalAmount: this.totalAmount
    };
      // Simulate plate verification
      this.qrDataTransfer.setQRData(qrData);
      localStorage.setItem('qrVisitingPermit', JSON.stringify(qrData));
      
      this.router.navigate(['/qr-details'])
    }
    else{
      this.toaster.error("please select time duration")
    }

    
  }
 selectDuration(duration: ParkingDurationOption) {
      this.selectedDuration = duration;
      this.endTime = this.calculateEndTime(this.dateAndTime.toString() ,duration.duration)
      this.totalAmount = duration.amount;
  }

    calculateEndTime(startTime:string , duration:string|""):string {
      
    const startDate = new Date(startTime);
    const [hours, minutes] = duration.split(':').map(Number);
    startDate.setHours(startDate.getHours() + hours);
    startDate.setMinutes(startDate.getMinutes() + minutes);
    return startDate.toISOString();
    }


  GetVisitorVoucherByLocationId(){
    this.visitorService.GetVisitorVoucherByLocationId(this.locationId)
      .subscribe(data=>{        
        this.locationId = data.Data.locationId
        this.locationAddress = data.Data.address
        this.maxParkingDuration  = data.Data.maxParkingDuration
        this.parkingSlotsAvailable = data.Data.totalParkingSlots
        this.formatdMaxParkingDuration()
        this.parkingDuration = data.Data.parkingDurations.map((option: any) => ({
          ...option,
          label: this.formatDuration(option.duration)
        }));
      });
  }

  formatDuration(duration: string): string {
    
    const [hours, minutes] = duration.split(':').map(Number);
    let label = '';
    if (hours) label += `${hours} hr${hours > 1 ? 's' : ''}`;
    if (minutes) label += (label ? ' ' : '') + `${minutes} min${minutes > 1 ? 's' : ''}`;
    return label || '0 mins';
  }

 

  formatdMaxParkingDuration(){
    if (this.maxParkingDuration) {
      const hours = this.maxParkingDuration.split(':')[0];
      this.formattedMaxParkingDuration = `${+hours} Hrs`; 
    }
  }
}
