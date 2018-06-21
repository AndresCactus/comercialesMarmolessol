import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveriesPage } from '../deliveries/deliveries';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  homeForm: FormGroup;

  deliveriesPage = DeliveriesPage;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder) {

      this.homeForm = this.formBuilder.group({
        client: ['', Validators.required],
        direction: ['', Validators.required],
        town: ['', Validators.required],
        city: ['',Validators.required],
        cp: ['',Validators.required],
        phone: ['', Validators.required],
        mail: ['', Validators.required],
        contact: ['', Validators.required]
      });

  }

  next(){

    console.log("Cliente: " + this.homeForm.value.client);
    console.log("Dirección: " + this.homeForm.value.direction);
    console.log("Población: " + this.homeForm.value.town);
    console.log("Ciudad: " + this.homeForm.value.city);
    console.log("Codigo Postal: " + this.homeForm.value.cp);
    console.log("Telefono: " + this.homeForm.value.phone);
    console.log("Mail: " + this.homeForm.value.mail);
    console.log("Nombre: " + this.homeForm.value.contact);

    this.navCtrl.push(this.deliveriesPage, this.homeForm);

  }

}
