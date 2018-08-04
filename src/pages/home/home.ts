import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user : string;
  password : string;
  tasks : any

  constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>, public alertCtrl: AlertController) {
    this.user = this.ngRedux.getState().email;
    this.password = this.ngRedux.getState().password;
    this.tasks =  [{title:"zacary", description:"todo"}, {title:"zacary2", description:"todo"}];
    //this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Welcome!',
      subTitle: this.user,
      buttons: ['OK']
    });
    alert.present();
  }

}
