import { Injectable, Output, EventEmitter } from '@angular/core';
import { Budget  } from './budget';
import { Http } from '@angular/http';

@Injectable()
export class BudgetService {
    //CHANGE THIS URL
    private BudgetsUrl = 'http://agile-cove-43620.herokuapp.com/api/budget';

    constructor (private http: Http) {}


    @Output() addBudget: EventEmitter<Budget> = new EventEmitter();
    addNewBudget(budget: Budget)
    {
      this.addBudget.emit(budget);
    }
  

    // get("/api/budget")
    getBudgets(): Promise<void | Budget[]> {
      return this.http.get(this.BudgetsUrl)
                 .toPromise()
                 .then(response => response.json() as Budget[])
                 .catch(this.handleError);
    }

    // post("/api/budget")
    createBudget(newBudget: Budget): Promise<void | Budget> {
      return this.http.post(this.BudgetsUrl, newBudget)
                 .toPromise()
                 .then(response => response.json() as Budget)
                 .catch(this.handleError);
    }

    // get("/api/budget/:id") endpoint not used by Angular app

    // delete("/api/budget/:id")
    deleteBudget(delBudgetId: String): Promise<void | String> {
      return this.http.delete(this.BudgetsUrl + '/' + delBudgetId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/budget/:id")
    updateBudget(putBudget: Budget): Promise<void | Budget> {
      var putUrl = this.BudgetsUrl + '/' + putBudget._id;
      return this.http.put(putUrl, putBudget)
                 .toPromise()
                 .then(response => response.json() as Budget)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error("Error coming frfom server: "+errMsg); // log to console instead
    }
}