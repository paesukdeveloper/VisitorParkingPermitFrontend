import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  progressWidth = 0;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.setProgress(this.router.url); // set initial value
  }
  ngDoCheck(): void {
    // Recalculate on every change detection cycle
    this.setProgress(this.router.url);
  }
  setProgress(url: string): void {
    if (url.includes('/dashboard')) {
      this.progressWidth = 33;
     
    } 
    else if (url.includes('/Parking-details')) {
      this.progressWidth = 50;
    }
    else if (url.includes('/thank-you')) {
      this.progressWidth = 100;
    } else {
      this.progressWidth = 0;
    }
  }
}
