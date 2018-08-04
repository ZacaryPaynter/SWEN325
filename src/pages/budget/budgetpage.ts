import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private budgetService: BudgetService, private ngRedux: NgRedux<MyState>) {
    this.user = this.ngRedux.getState().email;
  }

  ngOnInit()
  {
    this.budgetService
    .getBudgets()
    .then((budget: Budget[]) => {
      this.budget = budget.map((budget) => {
        return budget;
      });
      this.spending = this.calculateSpending(this.budget);
    });
  }


  calculateSpending(budget: Budget[])
  {
    var amount = 0;

    for (var i=0; i < budget.length; i++)
    {
      if (budget[i].income)
      {
        amount += budget[i].amount;
      }
      else 
      {
        amount -= budget[i].amount;
      }
    
    }
    return amount;
  }

  private getIndexOfBudget = (budgetId: String) => {
    return this.budget.findIndex((budget) => {
      return budget._id === budgetId;
    });
  }

  addNewBudget()
  {
      const alert = this.alertCtrl.create({
        title: 'MAKE A BUDGET',
        subTitle: this.user,
        buttons: ['OK']
      });
      alert.present();
  }

  selectBudget(budget: Budget) {
    this.budgetItem = budget
  }

  createNewBudget() {
    this.navCtrl.push(BudgetDetail);
  }

  // deleteBudget = (budgetId: String) => {
  //   var idx = this.getIndexOfBudget(budgetId);
  //   if (idx !== -1) {
  //     this.budget.splice(idx, 1);
  //     this.selectBudget(null);
  //   }
  //   return this.budget;
  // }

  // addBudget = (budget: Budget) => {
  //   this.budget.push(budget);
  //   this.selectBudget(budget);
  //   return this.budget;
  // }

  // updateBudget = (budget: Budget) => {
  //   var idx = this.getIndexOfBudget(budget._id);
  //   if (idx !== -1) {
  //     this.budget[idx] = budget;
  //     this.selectBudget(budget);
  //   }
  //   return this.budget;
  // }
  

}
