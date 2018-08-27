import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { NavController, Slides} from 'ionic-angular';
import { NgRedux } from '../../../node_modules/ng2-redux';
import { MyState } from '../../store/store';
import { Schedule } from '../schedule/schedule';
import { ScheduleService } from './schedule.service';
import { SchedTime } from './schedtime';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedulepage.html', 
  providers: [ScheduleService]
})
export class SchedulePage implements AfterViewInit{

  @ViewChild(Slides) slides: Slides;
  user: string;
  schedules: Schedule[];
  currentSchedule: Schedule;

  constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>,
    private scheduleService: ScheduleService) {
    this.user = this.ngRedux.getState().email;
    this.schedules = [];
    this.scheduleService
    .getSchedules()
    .then((schedule: Schedule[]) => {
      this.schedules = schedule.map((schedule) => {
        return schedule;
      });
    });
  }

  ngAfterViewInit() {
    this.slides.freeMode = true;
  }

  editCurrentSchedule(sched: SchedTime){
    console.log("editing: "+sched.timeid+" on day: "+this.currentSchedule.day);
  }

  public toggleSection(i: number, schedule: Schedule) {
    this.currentSchedule = schedule;
    this.currentSchedule.sched_times[i].open = !this.currentSchedule.sched_times[i].open;
  } 

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

}