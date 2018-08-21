import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';
import { LOGIN } from '../../store/actions';


@Component({
    templateUrl: 'login.html'
  })
  export class LoginPage {
    email: string;
    password: string;
    
    constructor(public navCtrl: NavController, private events: Events,
      private ngRedux: NgRedux<MyState>) {
  
    }

    login(){
      this.ngRedux.dispatch({type:LOGIN, email:this.email, password:this.password });
      this.navCtrl.push(TabsPage, {email: this.email});
    }
  }