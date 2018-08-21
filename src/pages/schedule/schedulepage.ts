import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { NavController, Slides} from 'ionic-angular';
import { NgRedux } from '../../../node_modules/ng2-redux';
import { MyState } from '../../store/store';
import { Schedule } from '../schedule/schedule';
//import { SchedTime } from '../schedule/SchedTime';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedulepage.html', 
  providers: [ScheduleService]
})
export class SchedulePage implements AfterViewInit{

  @ViewChild(Slides) slides: Slides;
  user: string;
  schedules: Schedule[];

  constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>,
    private scheduleService: ScheduleService) {
    this.user = this.ngRedux.getState().email;
    this.schedules = [];
    this.scheduleService
    .getSchedules()
    .then((schedule: Schedule[]) => {
      this.schedules = schedule.map((schedule) => {
        console.log("current day: " + schedule.day);
        console.log("there are time entries: " + schedule.sched_times.length);
        return schedule;
      });
    });
  }

  ngAfterViewInit() {
    this.slides.freeMode = true;
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

}