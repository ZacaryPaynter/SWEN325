import { Component } from '@angular/core';
import { Budget } from './budget';
import { BudgetService } from './budget.service';
import { NavController, AlertController, Events, NavParams } from 'ionic-angular';
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

  isLoading: boolean = false;
  isEdit: boolean = false;


  constructor(public navCtrl: NavController, private event: Events, private spinnerDialog: SpinnerDialog,
    public alertCtrl: AlertController, private budgetService: BudgetService, private navParams: NavParams ) {
      if (this.navParams.get('currBudget')!=null){
        this.budgetItem = this.navParams.get('currBudget');
        this.isEdit = true;
        this.title = this.budgetItem.title;
        this.amount = this.budgetItem.amount;
        
      }
      this.spinnerDialog.show();
  }

  formValidator = () => {
    if (this.isIncome == 1) { this.income = true }
    else { this.income = false }

    if (this.title == null) {
      this.errMsg = "Please enter a title"
      this.formInvalid = true;
      return false;
    } else if (this.amount == null) {
      this.errMsg = "Please enter a numerical amount"
      this.formInvalid = true;
      return false;
    }
    else if (this.isIncome == null) {
      this.errMsg = "Please select income or outcome"
      this.formInvalid = true;
      return false;
    } else { 
      this.formInvalid = false;
      this.isLoading=true;
      return true;
     }
  }

  editCurrentBudgetItem(budgetItem : Budget)
  {
    if (this.formValidator())
    {
      //edit the current budget item
      budgetItem.title = this.title;
      budgetItem.amount = this.amount;
      budgetItem.income = this.income;
      // send this to the service, figure and publish 
      this.updateBudget(budgetItem);
    } else {return;}
  }

  createNewBudgetItem() 
  {
    if (this.formValidator())
    {
      this.createNewBudget();
      this.createBudget(this.budgetItem);
    } else {return;}
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
      this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Budget Item Added',
        subTitle: 'Successfully a new Item',
        message: newBudget.title + " : $" + newBudget.amount,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.event.publish('budget:created', budget);
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }

  updateBudget(budget: Budget) {
    this.budgetService.updateBudget(budget).then((newBudget: Budget) => {
      this.isEdit = false;
      this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Budget Item Edited',
        subTitle: 'Successfully edited Item',
        message: newBudget.title + " : $" + newBudget.amount,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.event.publish('budget:edited', budget);
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }
}