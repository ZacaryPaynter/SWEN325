import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { Budget } from './budget';
import { BudgetService } from './budget.service';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';
import { BudgetDetail } from './budget-detail';

@Component({
  selector: 'page-budget',
  templateUrl: 'budgetpage.html',
  providers: [BudgetService]
})
export class BudgetPage implements OnInit {
  user: string;
  budget: Budget[]
  budgetItem: Budget
  spending: number
  totalAmount: number

  isLoaded : boolean = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public events: Events,
    private budgetService: BudgetService, private ngRedux: NgRedux<MyState>) {
    this.user = this.ngRedux.getState().email;
    events.subscribe('budget:created', (budget) => {
      this.addBudget(budget);
      this.spending = this.calculateSpending(this.budget);
    });
    events.subscribe('budget:edited', (budget) => {
      this.updateBudget(budget);
      this.spending = this.calculateSpending(this.budget);
    });
  }


  ngOnInit() {
    this.budget = [];
    this.budgetService
      .getBudgets()
      .then((budget: Budget[]) => {
        this.budget = budget.map((budget) => {
          return budget;
        });
        this.spending = this.calculateSpending(this.budget);
        this.isLoaded = true;
      });
  }

  calculateSpending(budget: Budget[]) {
    this.totalAmount = 0;
    for (var i = 0; i < budget.length; i++) {
      var amount = Number(budget[i].amount);
      if (budget[i].income) {
        this.totalAmount = this.totalAmount + amount;
      }
      else {
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

  editCurrentBudget(budget: Budget) {
    this.navCtrl.push(BudgetDetail, {currBudget: budget});
  }

  removeCurrentBudget(budget: Budget) {
    const alert = this.alertCtrl.create({
      title: 'Are you sure? ',
      subTitle: 'Are you sure you want to remove the following budget item:',
      message: budget.title + " : $" + budget.amount,
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
            this.budgetService.deleteBudget(budget._id);
            this.deleteBudget(budget._id);
          }
        },
      ]
    });
    alert.present();
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

  updateBudget = (budget: Budget) => {
    var idx = this.getIndexOfBudget(budget._id);
    if (idx !== -1) {
      this.budget[idx] = budget;
      this.selectBudget(budget);
    }
    return this.budget;
  }

}
