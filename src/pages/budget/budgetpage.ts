import { Component, OnInit} from '@angular/core';
import { NavController, AlertController, Events} from 'ionic-angular';
import { Budget } from './budget';
import { BudgetService } from './budget.service';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';
import { BudgetDetail } from './budget-detail';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html', 
  providers: [BudgetService]
})
export class BudgetPage implements OnInit{
user: string;
budget : Budget[]
budgetItem : Budget 
spending : number
totalAmount: number;

constructor(public navCtrl: NavController, public alertCtrl: AlertController, public events: Events,
    private budgetService: BudgetService, private ngRedux: NgRedux<MyState>) {
    this.user = this.ngRedux.getState().email;
    events.subscribe('budget:created', (budget) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', budget.title);
      this.addBudget(budget);
      this.spending = this.calculateSpending(this.budget);
    });
  }

  ngOnInit()
  {
    this.budget = [];
    this.budgetService
    .getBudgets()
    .then((budget: Budget[]) => {
      this.budget = budget.map((budget) => {
        return budget;
      });
      this.spending = this.calculateSpending(this.budget);
    });
  }

  handleOverslide(item){
    console.log("is this supposed to work: " + item);
  }

  calculateSpending(budget: Budget[])
  {
    this.totalAmount = 0;
    for (var i=0; i < budget.length; i++)
    {
      var amount = Number(budget[i].amount);
      if (budget[i].income)
      {
        this.totalAmount = this.totalAmount + amount;
      }
      else 
      {
        this.totalAmount = this.totalAmount - amount;
      }
    }
    return this.totalAmount;
  }

  private getIndexOfBudget = (budgetId: String) => {
    return this.budget.findIndex((budget) => {
      return budget._id === budgetId;
    });
  }

  selectBudget(budget: Budget) {
    this.budgetItem = budget
  }

  createNewBudget() {
    this.navCtrl.push(BudgetDetail);
  }

  removeCurrentBudget(budget: Budget) {
    this.budgetService.deleteBudget(budget._id);
    this.deleteBudget(budget._id);
  }

  deleteBudget = (budgetId: String) => {
    var idx = this.getIndexOfBudget(budgetId);
    if (idx !== -1) {
      this.budget.splice(idx, 1);
      this.selectBudget(null);
      this.spending = this.calculateSpending(this.budget);
    }
    return this.budget;
  }

  addBudget = (budget: Budget) => {
    this.budget.push(budget);
    this.selectBudget(budget);
    return this.budget;
  }

}
