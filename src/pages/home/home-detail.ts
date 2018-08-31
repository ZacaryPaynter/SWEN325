import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { HomeItem } from './home-item';



@Component({
  selector: 'home-details',
  templateUrl: 'home-detail.html'
})

export class HomeDetail {
 homeItem: HomeItem;
 title: string;
 description: string;
 list: number;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
      private navParams: NavParams ) {
        this.homeItem = this.navParams.get("homeitem");
  }

  removeCurrentItem(){
    console.log("remove task")
  }

  editCurrentItem(item: HomeItem){
    console.log("edit the item: "+item.title+" desc "+item.description+" list: "+item.list);
    console.log("to be : "+this.title+" desc "+this.description+" list: "+this.list);
  }
 
  
}