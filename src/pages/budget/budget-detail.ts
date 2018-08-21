import { Component } from '@angular/core';
import { Budget } from './budget';
import { BudgetService } from './budget.service';
import { NavController, AlertController, Events } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';


@Component({
  selector: 'budget-details',
  templateUrl: 'budget-detail.html',
  providers: [BudgetService]
})

export class BudgetDetail {
  budgetItem: Budget;

  title: string;
  amount: number;
  isIncome: number;
  income: boolean;
  budget: Budget[];

  errMsg: string;
  formInvalid = false;


  constructor(public navCtrl: NavController, private event: Events, private spinnerDialog: SpinnerDialog,
    public alertCtrl: AlertController, private budgetService: BudgetService) {
    this.spinnerDialog.show();
  }

  createNewBudgetItem() {
    if (this.isIncome == 1) { this.income = true }
    else { this.income = false }
    if (this.title == null) {
      //this.errorPopup('title');
      this.errMsg = "Please enter a title"
      this.formInvalid = true;
      return;
    } else if (this.amount == null) {
      //this.errorPopup('amount');
      this.errMsg = "Please enter a numerical amount"
      this.formInvalid = true;
      return;
    }
    else if (this.isIncome == null) {
      //this.errorPopup('income');
      this.errMsg = "Please select income or outcome"
      this.formInvalid = true;
      return;
    } else { this.formInvalid = false; }
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

  errorPopup(type: string) {
    const alert = this.alertCtrl.create({
      title: 'Invalid Form',
      subTitle: 'You need to enter all details',
      message: "Please enter : " + type,
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  createBudget(budget: Budget) {
    this.budgetService.createBudget(budget).then((newBudget: Budget) => {
      this.spinnerDialog.hide();
      const alert = this.alertCtrl.create({
        title: 'Budget Item Added',
        subTitle: 'Successfully a new Item',
        message: newBudget.title + " : $" + newBudget.amount,
        buttons: [
          {
            text: 'OK',
            handler: () => {
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