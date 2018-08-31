import { Injectable, Output, EventEmitter } from '@angular/core';
import { HomeItem } from './home-item';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {
    //CHANGE THIS URL
    private TasksUrl = 'http://agile-cove-43620.herokuapp.com/api/tasks';

    constructor (private http: Http) {}


    // @Output() addHomeItem: EventEmitter<HomeItem> = new EventEmitter();
    // addNewBudget(homeItem: HomeItem)
    // {
    //   this.addHomeItem.emit(homeItem);
    // }
  

    // get("/api/budget")
    getHomeItems(): Promise<void | HomeItem[]> {
      return this.http.get(this.TasksUrl)
                 .toPromise()
                 .then(response => response.json() as HomeItem[])
                 .catch(this.handleError);
    }

   // post("/api/budget")
    createItem(item: HomeItem): Promise<void | HomeItem> {
      return this.http.post(this.TasksUrl, item)
                 .toPromise()
                 .then(response => response.json() as HomeItem)
                 .catch(this.handleError);
    }

    // // get("/api/budget/:id") endpoint not used by Angular app

      // delete("/api/tasks/:id")
      deleteItem(delTasksId: String): Promise<void | String> {
        return this.http.delete(this.TasksUrl + '/' + delTasksId)
                   .toPromise()
                   .then(response => response.json() as String)
                   .catch(this.handleError);
      }

     // put("/api/tasks/:id")
     updateItem(putItem: HomeItem): Promise<void | HomeItem> {
        var putUrl = this.TasksUrl + '/' + putItem._id;
        return this.http.put(putUrl, putItem)
                   .toPromise()
                   .then(response => response.json() as HomeItem)
                   .catch(this.handleError);
      }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error("Error coming from server: "+errMsg); // log to console instead
    }
}