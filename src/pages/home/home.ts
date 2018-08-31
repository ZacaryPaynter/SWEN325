import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { NgRedux } from 'ng2-redux';
import { MyState } from '../../store/store';
import {HomeDetail} from './home-detail';
import {HomeAddDetail} from './home-add-detail'
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
  
    this.updateLists();
    this.showAlert();
  }


  private updateLists(){

    this.todoList = [];
    this.doingList = [];
    this.doneList = [];
    this.fullList = [];

    this.service.getHomeItems().then(
      (homeItem : HomeItem[]) => {
    

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
      var homeItem2 : HomeItem = {
        title : this.doingList[i].title,
        description : this.doingList[i].description,
        list: x
      }
      this.navCtrl.push(HomeDetail, {homeitem: homeItem2});
    }else{
      var homeItem3 : HomeItem = {
        title : this.doneList[i].title,
        description : this.doneList[i].description,
        list: x
      }
      this.navCtrl.push(HomeDetail, {homeitem: homeItem3});
    }  

  }

  public addNewItem(){
    this.navCtrl.push(HomeAddDetail);
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
