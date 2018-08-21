import { Injectable, Output, EventEmitter } from '@angular/core';
import { Schedule } from './schedule';
import { Http, Response } from '@angular/http';

@Injectable()
export class ScheduleService {
    //CHANGE THIS URL
    private SchedulesUrl = 'http://agile-cove-43620.herokuapp.com/api/schedule';

    constructor (private http: Http) {}

    // This is for emitting change in budget, either update a new sched event or remove (revert back to 'add item etc')
    @Output() addSchedule: EventEmitter<Schedule> = new EventEmitter();

    addNewSchedule(schedule: Schedule)
    {
      this.addSchedule.emit(schedule);
    }
  
    // get all schedule items from the database
    // get("/api/schedule")
    getSchedules(): Promise<void | Schedule[]> {
      console.log("service getting schedules");
      return this.http.get(this.SchedulesUrl)
                 .toPromise()
                 .then(response => response.json() as Schedule[])
                 .catch(this.handleError);
    }

    // put("/api/schedule/:id")
    updateSchedule(putSchedule: Schedule): Promise<void | Schedule> {
      var putUrl = this.SchedulesUrl + '/' + putSchedule._id;
      return this.http.put(putUrl, putSchedule)
                 .toPromise()
                 .then(response => response.json() as Schedule)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error("Error coming frfom server: "+errMsg); // log to console instead
    }
}