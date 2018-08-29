import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';
import { LOGIN } from '../../store/actions';

@Component({
    templateUrl: 'login.html'
  })
  export class LoginPage {
    username: string = "";
    password: string = "";
    
    constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>) {

    }

    login(){
      this.ngRedux.dispatch({type:LOGIN, email:this.username, password:this.password });
      this.navCtrl.push(TabsPage, {email: this.username});
    }
  }