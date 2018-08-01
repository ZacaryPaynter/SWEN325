import { Component, OnInit } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Budget } from './budget';
import { BudgetService } from './budget.service';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html', 
  providers: [BudgetService]
})
export class BudgetPage implements OnInit{

budget : Budget[]
//income : Budget[]
outcome : Budget[]
budgetItem : Budget 

  constructor(public navCtrl: NavController, private budgetService: BudgetService) {

  }

  ngOnInit()
  {
    this.budgetService
    .getBudgets()
    .then((budget: Budget[]) => {
      this.budget = budget.map((budget) => {
        return budget;
      });
    });
  }


  // private getIndexOfBudget = (budgetId: String) => {
  //   return this.budget.findIndex((budget) => {
  //     return budget._id === budgetId;
  //   });
  // }


  // selectBudget(budget: Budget) {
  //   this.budgetItem = budget
  // }

  // createNewBudget() {
  //   var budget: Budget = {
  //     title: '',
  //     amount: 0,
  //     isIncome: false
  //   };

  //   // By default, a newly-created contact will have the selected state.
  //   this.selectBudget(budget);
  // }

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

  // updateContact = (budget: Budget) => {
  //   var idx = this.getIndexOfBudget(budget._id);
  //   if (idx !== -1) {
  //     this.budget[idx] = budget;
  //     this.selectBudget(budget);
  //   }
  //   return this.budget;
  // }
  

}
