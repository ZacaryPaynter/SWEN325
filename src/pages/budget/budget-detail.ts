import { Component } from '@angular/core';
import { Budget } from './budget';
import { BudgetService } from './budget.service';
import { NavController, AlertController, Events} from 'ionic-angular';


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


    constructor(public navCtrl: NavController, private event : Events,
      public alertCtrl: AlertController, private budgetService: BudgetService){}

    createNewBudgetItem(){
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

    createBudget(budget: Budget) {
      this.budgetService.createBudget(budget).then((newBudget: Budget) => {
        const alert = this.alertCtrl.create({
          title: 'Budget Item Added',
          subTitle: 'Successfully a new Item',
          message: newBudget.title + " : $" + newBudget.amount,
          buttons: [
            {
              text: 'OK',
              handler: () =>{
                console.log("go back to budget page");
                this.event.publish('budget:created', budget);
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      });
    }
  }