import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  detail;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detail = this.navParams.data.details;
  }

}
