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
  tasks : any

  constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>, public alertCtrl: AlertController) {
    this.user = this.ngRedux.getState().email;
    //this.user = this.navParams.get('email');
    this.password = this.ngRedux.getState().password;
    this.tasks =  [{title:"laundry", description:"do the laundry"}, {title:"cleaning", description:"clean the bathroom"}];
    this.showAlert();
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
