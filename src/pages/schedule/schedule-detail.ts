import { Component } from '@angular/core';
import { Schedule } from './schedule';
import { ScheduleService } from './schedule.service';
import { NavController, AlertController, Events, NavParams } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
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
  //isEdit: boolean = false;


  constructor(public navCtrl: NavController, private event: Events, private spinnerDialog: SpinnerDialog,
    public alertCtrl: AlertController, private scheduleService: ScheduleService, private navParams: NavParams ) {
     // if (this.navParams.get('currSchedule')!=null){
        //console.log("edit instead of new Schedule");
        this.scheduleItem = this.navParams.get('currentSchedule');
        this.schedTime = this.navParams.get('schedtime');
        console.log();
        //this.isEdit = true;
     // }
  }

  formValidator = () => {
    console.log("categoryValue is: "+this.categoryValue);

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
        this.errMsg = "Please enter a numerical amount"
      this.formInvalid = true;
      return false;
    } else if (this.description == null) {
      this.errMsg = "Please select income or outcome"
      this.formInvalid = true;
      return false;
    } else if (this.category == null) {
        this.errMsg = "Please select a category"
        this.formInvalid = true;
        return false;
      }else { 
      this.formInvalid = false;
      this.isLoading=true;
      return true;
     }
  }


  editCurrentSchedule(){
    //get the sched time in this.currentSchedule.sche_times array 
    //update it to have new values that have been entered
    //send the entire schedule to the service to be updated on the server
    if (this.formValidator())
    {
      this.schedTime.title = this.title;
      this.schedTime.description = this.description;
      this.schedTime.category = this.category;
      this.schedTime.open = false;
      this.updateScheduleSchedTime(this.schedTime);
      this.updateSchedule(this.scheduleItem);
    } else {return;}
  }

  selectSchedule(schedule: Schedule) {
    this.scheduleItem = schedule;
  }

  createSchedule(schedule: Schedule) {
      //empty even
    this.scheduleService.updateSchedule(schedule).then((newSchedule: Schedule) => {
      //this.isEdit = false;
      this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Schedule Event Created',
        subTitle: 'Successfully created Event',
        message: "Event: " + newSchedule.day ,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.event.publish('schedule:created', schedule);
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }

  private getIndexOfSchedTime = (timeId: number) => {
    console.log("timeid is: " + timeId);
    return this.scheduleItem.sched_times.findIndex((schedTime) => {
      return schedTime.timeid === timeId;
    });
  }

  updateScheduleSchedTime = (schedtime: SchedTime) => {
    var idx = this.getIndexOfSchedTime(schedtime.timeid);
    if (idx !== -1) {
      console.log("got index of schedtime and updated scheduleditem");
      this.scheduleItem.sched_times[idx] = schedtime;
      this.selectSchedule(this.scheduleItem);
    }
    return this.scheduleItem;
  }


  updateSchedule(schedule: Schedule) {
    this.scheduleService.updateSchedule(schedule).then((newSchedule: Schedule) => {
      console.log("successfully back from server "+newSchedule.day);
      for (var i=0; i<newSchedule.sched_times.length; i++){
        console.log("timeid: "+newSchedule.sched_times[i].timeid+" title: "+
        newSchedule.sched_times[i].title+" desc: "+newSchedule.sched_times[i].description + 
        " category: "+newSchedule.sched_times[i].category);
      }
      //this.isEdit = false;
      this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Schedule Event Edited',
        subTitle: 'Successfully edited Event',
        message: "Event: " + newSchedule.day ,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.event.publish('schedule:edited', schedule);
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }
}