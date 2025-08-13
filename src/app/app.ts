import { Component, ChangeDetectionStrategy, NgZone, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit, OnDestroy {
  isOpen = false;
  todayDate = new Date().toDateString();
  currentTime = '';
  private intervalId: any;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const updateTime = () => {
      const now = new Date();
      this.currentTime =
        `${now.getHours().toString().padStart(2,'0')}:` +
        `${now.getMinutes().toString().padStart(2,'0')}:` +
        `${now.getSeconds().toString().padStart(2,'0')}`;
      this.cdr.markForCheck();
    };

    this.zone.runOutsideAngular(() => {
      updateTime();
      this.intervalId = setInterval(() => this.zone.run(updateTime), 1000);
    });
  }

  ngOnDestroy(): void { clearInterval(this.intervalId); }
  toggleMenu() { this.isOpen = !this.isOpen; }
}
