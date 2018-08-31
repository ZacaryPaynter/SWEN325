import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, Events } from 'ionic-angular';
import { HomeItem } from './home-item';
import { HomeService } from './home-service';



@Component({
  selector: 'home-details',
  templateUrl: 'home-detail.html',
  providers: [HomeService]
})

export class HomeDetail {
 homeItem: HomeItem;
 title: string;
 description: string;
 list: number;

 errMsg: string;
 formInvalid : boolean  = false;

 isLoading : boolean = false;
 isRemoving : boolean = false;
 isEdit : boolean = true;



  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
      private navParams: NavParams, private service : HomeService, private event: Events) {
        this.homeItem = this.navParams.get("homeitem");
        this.title = this.homeItem.title;
        this.description = this.homeItem.description;
  }

  removeCurrentItem() {
    const alert = this.alertCtrl.create({
      title: 'Are you sure? ',
      subTitle: 'Are you sure you want to remove the following budget item:',
      message: this.homeItem.title + " : " + this.homeItem.description,
      buttons: [
        {
          text: 'CANCEL',
          handler: () => {
            return;
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.isRemoving = true;
            this.isEdit = false;
            this.service.deleteItem(this.homeItem._id).then(()=>{
              this.event.publish('task:change');
              this.navCtrl.pop();
            });
           
          }
        },
      ]
    });
    alert.present();
  }


  formValidator = () => {

    if (this.title == null) {
      this.errMsg = "Please enter a title"
      this.formInvalid = true;
      return false;
    } else if (this.description == null) {
      this.errMsg = "Please enter a description"
      this.formInvalid = true;
      return false;
    }
    else if (this.list == null) {
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

  editCurrentItem(item: HomeItem){
    if (this.formValidator())
    {
      //edit the current budget item
      item.title = this.title;
      item.description = this.description;
      item.list = this.list;
      // send this to the service, figure and publish 
      this.updateItem(item);
    } else {return;}
  }
 
  updateItem(item: HomeItem) {
    this.service.updateItem(item).then((newItem: HomeItem) => {
      this.isRemoving = false;
      this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Item Edited',
        subTitle: 'Successfully edited Item',
        message: newItem.title + " : " + newItem.description,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.event.publish('task:change');
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }
  
}