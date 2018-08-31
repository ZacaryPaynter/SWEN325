import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { HomeItem } from './home-item';
import { HomeService } from './home-service';


@Component({
  selector: 'home-add-details',
  templateUrl: 'home-add-detail.html', 
  providers: [HomeService]
})

export class HomeAddDetail {
 homeItem: HomeItem;

 title: string = "" ;
 description: string = "";
 list: number = 0;

 isLoading : boolean = false;
 isEdit : boolean = true;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private service: HomeService, private event: Events) {
       this.homeItem = {
        title: "" ,
        description: "",
        list: 0
       }
  }

  addNewItem(){
    this.isEdit = false;
    this.isLoading = true;
    this.homeItem.title = this.title;
    this.homeItem.description = this.description;
    this.homeItem.list = this.list; 

    this.service.createItem(this.homeItem).then( (item:HomeItem) =>{
      this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Item Edited',
        subTitle: 'Successfully edited Item',
        message: this.homeItem.title + " : $" + this.homeItem.description,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.event.publish("task:change");
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }); 
     
  }
}