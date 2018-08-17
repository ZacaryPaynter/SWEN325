import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { NavController, Slides} from 'ionic-angular';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage implements AfterViewInit{

  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
    this.slides.freeMode = true;
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

}