import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, FabContainer } from 'ionic-angular';
import { NgRedux } from '../../../node_modules/ng2-redux';
import { MyState } from '../../store/store';
import { Schedule } from '../schedule/schedule';
import { ScheduleService } from './schedule.service';
import { SchedTime } from './schedtime';
import { ScheduleDetail } from './schedule-detail';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedulepage.html', 
  providers: [ScheduleService]
})
export class SchedulePage {

  @ViewChild(Slides) slides: Slides;
  @ViewChild('fab') fab : FabContainer;
  
  user: string;
  schedules: Schedule[];
  currentSchedule: Schedule;

  isLoaded : boolean = false;

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
      this.isLoaded = true;
    }); 
  }

  ionViewDidLoad(){
    this.fab.toggleList();
 }

  editCurrentSchedule(sched: SchedTime){
    this.navCtrl.push(ScheduleDetail, {currentSchedule: this.currentSchedule, schedtime: sched});
  }

  public toggleSection(i: number, schedule: Schedule) {
    this.currentSchedule = schedule;
    this.currentSchedule.sched_times[i].open = !this.currentSchedule.sched_times[i].open;
  } 

  slideTo(i: number){
    this.slides.slideTo(i);
  }

}