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

 errMsg: string;
 formInvalid : boolean  = false;

 isLoading : boolean = false;
 isRemoving : boolean = false;
 isEdit : boolean = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private service: HomeService, private event: Events) {
       this.homeItem = {
        title: "" ,
        description: "",
        list: 1
       }
  }

  addNewItem(){
    if(!this.formValidator()){return;}

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

  formValidator = () => {

    if (this.title == "") {
      this.errMsg = "Please enter a title"
      this.formInvalid = true;
      return false;
    } else if (this.description == "") {
      this.errMsg = "Please enter a description"
      this.formInvalid = true;
      return false;
    }
    else if (this.list == 0) {
      this.errMsg = "Please select a list"
      this.formInvalid = true;
      return false;
    } else { 
      this.formInvalid = false;
      this.isLoading=true;
      this.isEdit = false;
      return true;
     }
  }
}