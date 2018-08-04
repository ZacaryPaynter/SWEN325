import { Component, Input} from '@angular/core';
import { Budget } from './budget';
import { BudgetService } from './budget.service';
import { NavController, AlertController} from 'ionic-angular';
import { BudgetPage } from './budgetpage';

@Component({
    selector: 'budget-details',
    templateUrl: 'budget-detail.html', 
    providers: [BudgetService]
  })

  export class BudgetDetail {
    budgetItem : Budget;
    title: string;
    amount: number;
    isIncome: number;
    income: boolean;
    budget: Budget[];

    @Input()
    createHandler: Function;
    constructor(public navCtrl: NavController, 
      public alertCtrl: AlertController, private budgetService: BudgetService){}

    createNewBudgetItem(){
      console.log("title: "+this.title);
      console.log("amount: "+this.amount);
      console.log("isIncome: "+this.isIncome);
      
      if (this.isIncome==1){this.income=true}
      else {this.income=false}

      this.createNewBudget();
      this.createBudget(this.budgetItem);
    }

    createNewBudget() {
      var budget: Budget = {
      title: this.title,
      amount: this.amount,
      income: this.income
    };
    // By default, a newly-created contact will have the selected state.
    this.selectBudget(budget);
    } 


    selectBudget(budget: Budget) {
      this.budgetItem = budget;
    }

    // addBudget = (budget: Budget) => {
    //   this.budget.push(budget);
    //   this.selectBudget(budget);
    //   return this.budget;
    // }

    createBudget(budget: Budget) {
      console.log(budget.title+" not sending an empty budget")
      this.budgetService.createBudget(budget).then((newBudget: Budget) => {
        const alert = this.alertCtrl.create({
          title: 'Well Done',
          subTitle: 'Successfully added the budget item',
          message: this.title + " : " + this.amount,
          buttons: [
            {
              text: 'OK',
              handler: () =>{
                this.navCtrl.push(BudgetPage);
              }
            }
          ]
        });
        alert.present();
      });
    }
  }