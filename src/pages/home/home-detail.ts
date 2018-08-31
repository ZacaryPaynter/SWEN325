import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
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
 formInvalid = false;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
      private navParams: NavParams, private service : HomeService) {
        this.homeItem = this.navParams.get("homeitem");
  }

  removeCurrentItem(){
    console.log("remove task")
    
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
      //this.isLoading=true;
      return true;
     }
  }

  editCurrentItem(item: HomeItem){
    console.log("edit the item: "+ item._id +" "+item.title+" desc "+item.description+" list: "+item.list);
    console.log("to be : "+this.title+" desc "+this.description+" list: "+this.list);
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
      // this.isEdit = false;
      // this.isLoading = false;
      const alert = this.alertCtrl.create({
        title: 'Item Edited',
        subTitle: 'Successfully edited Item',
        message: newItem.title + " : $" + newItem.description,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // this.event.publish('budget:edited', budget);
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    });
  }
  
}