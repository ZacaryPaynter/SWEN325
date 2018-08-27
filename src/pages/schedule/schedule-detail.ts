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

  category: number;

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

    if (this.day == null) {
      this.errMsg = "Please enter a title"
      this.formInvalid = true;
      return false;
    } else if (this.timeid == null) {
      this.errMsg = "Please enter a numerical amount"
      this.formInvalid = true;
      return false;
    } else if (this.title == null) {
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

  editCurrentScheduleItem(scheduleItem : Schedule)
  {
    if (this.formValidator())
    {
      //edit the current budget item
    //   budgetItem.title = this.title;
    //   budgetItem.amount = this.amount;
    //   budgetItem.income = this.income;

      // send this to the service, figure and publish 
      this.updateSchedule(scheduleItem);
    } else {return;}
  }

//   createNewBudgetItem() 
//   {
//     if (this.formValidator())
//     {
//       this.createNewBudget();
//       this.createBudget(this.budgetItem);
//     } else {return;}
//   }

//   createNewSchedule() {
//     var schedule = this.selectSchedule;
//     // Schedule = {
//     // //   title: this.title,
//     // //   amount: this.amount,
//     // //   income: this.income
//     // day: "",

//     // };
//     // By default, a newly-created contact will have the selected state.
//     //this.selectSchedule(schedule);
//   }

createNewScheduleItem()
{
    console.log("todo");
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


  updateSchedule(schedule: Schedule) {
    this.scheduleService.updateSchedule(schedule).then((newSchedule: Schedule) => {
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