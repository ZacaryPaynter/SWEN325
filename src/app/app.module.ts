import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BudgetPage } from '../pages/budget/budgetpage';
import { BudgetDetail } from '../pages/budget/budget-detail';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedulepage';
import { Schedule } from '../pages/schedule/schedule';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NgRedux, NgReduxModule } from 'ng2-redux';
import { MyState, rootReducer } from '../store/store';

import { INITIAL_STATE } from '../store/store';

import { HttpModule } from '@angular/http';

import { OverslideDirective } from '../directives/overslide/overslide';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@NgModule({
  declarations: [
    MyApp,
    BudgetPage,
    BudgetDetail,
    HomePage,
    LoginPage,
    OverslideDirective,
    TabsPage,
    SchedulePage, 
    Schedule
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    HttpModule,
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BudgetPage,
    BudgetDetail,
    HomePage,
    LoginPage,
    TabsPage,
    SchedulePage, 
    Schedule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpinnerDialog,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

  constructor(ngRedux: NgRedux<MyState>){
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }

}
