import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';
import {HomeDetail} from './home-detail';
import { HomeItem } from './home-item';
import { HomeService } from './home-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html', 
  providers: [HomeService]
})
export class HomePage {
  user : string;
  password : string;
  list : string;
  fullList: HomeItem[];

  todoList: HomeItem[];
  doingList: HomeItem[];
  doneList: HomeItem[];

  constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>, public alertCtrl: AlertController, private service: HomeService) {
    this.user = this.ngRedux.getState().email;
    this.password = this.ngRedux.getState().password;
   this.list = "todo";
    this.todoList = [];
    this.doingList = [];
    this.doneList = [];
    this.fullList = [];
    //cull 
    // this.todoList =  [{title:"laundry", description:"do the laundry", open:false, list:1}, {title:"cleaning", description:"clean the bathroom", open:false, list:1}];
    // this.doingList =  [{title:"laundry2", description:"do the laundry2", open:false, list:2}, {title:"cleaning2", description:"clean the2 bathroom",  open:false, list:2}];
    // this.doneList =  [{title:"laundry3", description:"do the laundr3y", open:false, list:3}, {title:"cleani3ng", description:"clean the ba3throom", open:false, list:3}];
    
    this.service.getHomeItems().then(
      (homeItem : HomeItem[]) => {
        console.log(homeItem);
        this.fullList = homeItem.map((homeItem) => {
          return homeItem;
        });
      }
    ).then(()=>{
      for (var i = 0 ; i< this.fullList.length ; i++){
        if(this.fullList[i].list == 1){
          this.todoList.push(this.fullList[i]);
        }else if (this.fullList[i].list ==2){
          this.doingList.push(this.fullList[i]);
        }else{
          this.doneList.push(this.fullList[i]);
        }
       }
    });
    
    
  

    this.showAlert();
  }


  public manage(x:number,i:number) {

    if(x == 1){
      console.log("sending a todolist item with i: "+i);
      var homeItem : HomeItem = {
        title : this.todoList[i].title,
        description : this.todoList[i].description,
        list: x
      }
      this.navCtrl.push(HomeDetail, {homeitem: homeItem});
    }else if(x ==2){
      var homeItem : HomeItem = {
        title : this.doingList[i].title,
        description : this.doingList[i].description,
        list: x
      }
      this.navCtrl.push(HomeDetail, {homeitem: homeItem});
    }else{
      var homeItem : HomeItem = {
        title : this.doneList[i].title,
        description : this.doneList[i].description,
        list: x
      }
      this.navCtrl.push(HomeDetail, {homeitem: homeItem});
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
