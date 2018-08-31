import { Component} from '@angular/core';

@Component({
  selector: 'schedule',
  templateUrl: 'schedule.html'
})

export class Schedule {
    _id?: string;
    day: string;
    sched_times: any[];

    constructor(){
      
    }

    public toggleSection(i) {
      this.sched_times[i].open = !this.sched_times[i].open;
    }


  }