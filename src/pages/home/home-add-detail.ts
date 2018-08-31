import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { HomeItem } from './home-item';
import { HomeService } from './home-service';


@Component({
  selector: 'home-add-details',
  templateUrl: 'home-add-detail.html'
})

export class HomeAddDetail {
 homeItem: HomeItem;

 title: string ;
 description: string ;
 list: number;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private service: HomeService) {
       
  }

  addNewItem(){

    this.homeItem.title = this.title;
    this.homeItem.description = this.description;
    this.homeItem.list = this.list; 

    //service add method
  }
}