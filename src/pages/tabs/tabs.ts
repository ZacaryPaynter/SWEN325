import { Component } from '@angular/core';

import { BudgetPage } from '../budget/budgetpage';
import { HomePage } from '../home/home';
import { SchedulePage } from '../schedule/schedulepage';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
  
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = BudgetPage;
  params;


  constructor(private navParams: NavParams) {
    this.params = this.navParams.data;
  }

}
