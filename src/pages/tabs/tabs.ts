import { Component } from '@angular/core';

import { BudgetPage } from '../budget/budget';
import { HomePage } from '../home/home';
import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = BudgetPage;

  constructor() {

  }
}
