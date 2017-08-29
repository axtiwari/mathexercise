import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { LogLevel, UserAuthInfo } from '../model';
import * as moment from 'moment';

@Component({
  selector: 'app-digit-clock',
  templateUrl: './digit-clock.component.html',
  styleUrls: ['./digit-clock.component.scss']
})
export class DigitClockComponent implements OnInit {
  @ViewChild("digitclock") clockElement: ElementRef;

  private _dateStart: Date;
  //private _size: number = 1;
  private _handle = null;
  private _hour: number = 0;
  private _min: number = 0;
  private _sec: number = 0;
  private _isStart: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set IsStart(istart: boolean) {
    if (this._isStart !== istart) {
      this._isStart = istart;

      if (this._isStart) {
        this._dateStart = new Date();
        this._handle = setInterval(()=> { this.onInterval(); }, 500); // Set to 0.5 sec for the dot         
        //this.onStart();
      } else {
        //this.onStop();
        if (this._handle !== null) {
          clearInterval(this._handle);
          this._handle = null;
        }        
      }
    }
  }

  public onInterval() {
    let clocks = this.clockElement.nativeElement.children;
    let timeSpent: number = new Date().getTime() - this._dateStart.getTime();
    let mt = moment.duration(timeSpent);
    if (environment.LoggingLevel >= LogLevel.Debug) {
      console.log("AC Math Exercise [Debug]: entering onInterval of Digit-clock:" + mt.asSeconds());
    }

    let sec = mt.seconds();
    clocks[6].className = "clock c" + (sec % 10);
    clocks[5].className = "clock c" + ((sec - (sec % 10)) / 10);

    if (sec % 2 === 0) {
      clocks[2].className = "clock dot";
    } else {
      clocks[2].className = "clock dot putout";
    }

    if (this._min !== mt.minutes()) {
      this._min = mt.minutes();
      clocks[4].className = "clock c" + (this._min % 10);
      clocks[3].className = "clock c" + ((this._min - (this._min % 10)) / 10);
    }

    if (this._hour !== mt.hours()) {
      this._hour = mt.hours();
      clocks[1].className = "clock c" + (this._hour % 10);
      clocks[0].className = "clock c" + ((this._hour - (this._hour % 10)) / 10);
    }    
  }
}