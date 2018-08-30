import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user : string;
  password : string;

  todoList: any[];
  doingList: any[];
  doneList: any[];

  constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>, public alertCtrl: AlertController) {
    this.user = this.ngRedux.getState().email;
    this.password = this.ngRedux.getState().password;

    this.todoList =  [{title:"laundry", description:"do the laundry", open:false}, {title:"cleaning", description:"clean the bathroom", open:false}];
    this.doingList =  [{title:"laundry2", description:"do the laundry2", open:false}, {title:"cleaning2", description:"clean the2 bathroom",  open:false}];
    this.doneList =  [{title:"laundry3", description:"do the laundr3y", open:false}, {title:"cleani3ng", description:"clean the ba3throom", open:false}];
    
    this.showAlert();
  }

  public manageItem(x,i) {

    if(x == 1){
      this.todoList[i].open = !this.todoList[i].open;
    }else if(x ==2){
      this.doingList[i].open = !this.doingList[i].open;
    }else{
      this.doneList[i].open = !this.doneList[i].open;
    }  
    
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Welcome!',
      subTitle: 'Welcome back '+this.user,
      buttons: ['OK']
    });
    alert.present();
  }

}
