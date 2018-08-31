import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { HomeItem } from './home-item';



@Component({
  selector: 'home-details',
  templateUrl: 'home-detail.html'
})

export class HomeDetail {
 homeItem: HomeItem;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
      private navParams: NavParams ) {
        this.homeItem = this.navParams.get("homeitem");
  }

 
  
}