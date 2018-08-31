import { Component } from '@angular/core';
import { Schedule } from './schedule';
import { ScheduleService } from './schedule.service';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { SchedTime } from './schedtime';


@Component({
  selector: 'schedule-details',
  templateUrl: 'schedule-detail.html',
  providers: [ScheduleService]
})

export class ScheduleDetail {
  scheduleItem: Schedule;

  schedTime : SchedTime;

  _id?: string;
  day: string;
  sched_times: SchedTime[];

  timeid: number;
  title: string;
  description: string; 
  category: string;

  categoryValue: number;

  errMsg: string;
  formInvalid = false;

  isLoading: boolean = false;
  isEdit: boolean = false;
  isRemoving: boolean = false;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    private scheduleService: ScheduleService, private navParams: NavParams ) {
        this.scheduleItem = this.navParams.get('currentSchedule');
        this.schedTime = this.navParams.get('schedtime');
        this.title = this.schedTime.title;
        this.description = this.schedTime.description;
        if (this.schedTime.title!=''){ this.isEdit = true; }
  }

  formValidator = () => {

    if (this.categoryValue==0){
      this.category="home"
    } else if (this.categoryValue==1){
      this.category="work"
    } else if (this.categoryValue==2){
      this.category="school"
    } else if (this.categoryValue==3){
      this.category="misc"
    } 

    if (this.title == null) {
        this.errMsg = "Please enter a title"
      this.formInvalid = true;
      return false;
    } else if (this.description == null) {
      this.errMsg = "Please enter a description"
      this.formInvalid = true;
      return false;
    } else if (this.category == null) {
        this.errMsg = "Please select a category"
        this.formInvalid = true;
        return false;
      }else { 
        console.log("form is valid apparently");
      this.formInvalid = false;
      this.isLoading=true;
      return true;
     }
  }

  removeEvent(){
    const alert = this.alertCtrl.create({
      title: 'Are you sure? ',
      subTitle: 'Are you sure you want to remove the following event:',
      message: this.schedTime.title + " : " + this.schedTime.description,
      buttons: [
        {
          text: 'CANCEL',
          handler: () => {
            return;
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.isRemoving = true;
            this.title = "";
            this.description = "";
            this.category = "";
            this.editCurrentSchedule();
          }
        },
      ]
    });
    alert.present();
  }

  editCurrentSchedule(){
    if (this.formValidator())
    {
      this.schedTime.title = this.title;
      this.schedTime.description = this.description;
      this.schedTime.category = this.category;
      this.schedTime.open = false;
      this.updateScheduleSchedTime(this.schedTime);
      this.updateSchedule(this.scheduleItem);
    } 
  }

  selectSchedule(schedule: Schedule) {
    this.scheduleItem = schedule;
  }


  private getIndexOfSchedTime = (timeId: number) => {
    return this.scheduleItem.sched_times.findIndex((schedTime) => {
      return schedTime.timeid === timeId;
    });
  }

  updateScheduleSchedTime = (schedtime: SchedTime) => {
    var idx = this.getIndexOfSchedTime(schedtime.timeid);
    if (idx !== -1) {
      this.scheduleItem.sched_times[idx] = schedtime;
      this.selectSchedule(this.scheduleItem);
    }
    return this.scheduleItem;
  }


  updateSchedule(schedule: Schedule) {
    this.scheduleService.updateSchedule(schedule).then((newSchedule: Schedule) => {
      this.isEdit = false;
      this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Event Updated',
        message: "Event changed on: " + newSchedule.day + " at: "+this.schedTime.timeid,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }
}