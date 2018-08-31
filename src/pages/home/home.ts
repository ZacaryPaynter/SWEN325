import { Component } from '@angular/core';
import { NavController, AlertController, Events} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private ngRedux: NgRedux<MyState>, public events: Events,
    public alertCtrl: AlertController, private service: HomeService) {
    this.user = this.ngRedux.getState().email;
    this.password = this.ngRedux.getState().password;
   this.list = "todo";
  
    this.updateLists();
    this.showAlert();

    events.subscribe('task:change', () => {
      this.updateLists();
    });
  }


  private updateLists(){
    console.log("made it back to lists");
    this.todoList = [];
    this.doingList = [];
    this.doneList = [];
    this.fullList = [];

    this.service.getHomeItems().
    then((homeItem : HomeItem[]) => {
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
  public manage(item: HomeItem) {

    this.navCtrl.push(HomeDetail, {homeitem: item});
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
