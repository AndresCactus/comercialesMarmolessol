import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore } from 'angularfire2/firestore'
import { NativeStorage } from '@ionic-native/native-storage';
import { OneSignal } from '@ionic-native/onesignal';


@IonicPage()
@Component({
  selector: 'page-deliveries',
  templateUrl: 'deliveries.html',
})
export class DeliveriesPage {

  home = HomePage;

  deliveriesForm: FormGroup;

  //Asignamos un valor falso a todas las variables para inicializarlas
  catalogue = false;
  granite = false;
  compac = false;
  expositor = '';
  piece = false;
  role = '';
  name = '';
  userMail = '';
  onesignal_id = '';

  displayPopup = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private geolocation: Geolocation,
              private nativeStorage: NativeStorage,
              private oneSignal: OneSignal,
              public platform: Platform,
              private afs: AngularFirestore) {

                this.displayPopup = false;

                this.deliveriesForm = navParams.data;

                this.nativeStorage.getItem('dataUser').then((data) => {
                  this.role = data.role,
                  this.name = data.name,
                  this.userMail = data.mail
                });

              if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
                this.oneSignal.getIds().then(id => {
                  this.onesignal_id = id.userId
                });
              }

                this.deliveriesForm = this.formBuilder.group({
                  client: [this.deliveriesForm.value.client ],
                  direction: [this.deliveriesForm.value.direction ],
                  town: [this.deliveriesForm.value.town ],
                  city: [this.deliveriesForm.value.city ],
                  cp: [this.deliveriesForm.value.cp ],
                  phone: [this.deliveriesForm.value.phone ],
                  mail: [this.deliveriesForm.value.mail ],
                  contact: [this.deliveriesForm.value.contact ],
                  catalogue: [false ],
                  granite: [false],
                  compac: [false],
                  expositor: [''],
                  piece: [false],
                  lat: [''],
                  long: [''],
                  name: [''],
                  createdAt: [''],
                  userMail: [''],
                  role: [''],
                  onesignal_id: [''],
                  notes: ['']
                });
  }

  next(){

    this.deliveriesForm.value.name = this.name;
    this.deliveriesForm.value.userMail = this.userMail;
    this.deliveriesForm.value.createdAt = new Date();
    this.deliveriesForm.value.role = this.role;
    this.deliveriesForm.value.onesignal_id = this.onesignal_id;

    console.log("Console log de entregas");

    console.log("Cliente: " + this.deliveriesForm.value.client);
    console.log("Dirección: " + this.deliveriesForm.value.direction);
    console.log("Población: " + this.deliveriesForm.value.town);
    console.log("Ciudad: " + this.deliveriesForm.value.city);
    console.log("Código Postal: " + this.deliveriesForm.value.cp);
    console.log("Telefono: " + this.deliveriesForm.value.phone);
    console.log("Mail: " + this.deliveriesForm.value.mail);
    console.log("Nombre: " + this.deliveriesForm.value.contact);

    console.log("Catálogo: " + this.deliveriesForm.value.catalogue);
    console.log("Tarifas granito: " + this.deliveriesForm.value.granite);
    console.log("tarifas Compac: " + this.deliveriesForm.value.compac);
    console.log("Expositor: " + this.deliveriesForm.value.expositor);
    console.log("Muestras: " + this.deliveriesForm.value.piece);
    console.log("Notas: " + this.deliveriesForm.value.notes);

    console.log("Fecha: " + new Date());

    this.geolocation.getCurrentPosition().then((resp) => {
      this.deliveriesForm.value.lat = resp.coords.latitude
      this.deliveriesForm.value.long = resp.coords.longitude
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);

      this.afs.collection('visits').doc(''+Date.now()).set(this.deliveriesForm.value);

     }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.displayPopup = true;

    document.getElementById("overlay").style.display = "block";
    
  }
  
  exit(){
    //document.getElementById("overlay").style.display = "none";
    this.navCtrl.setRoot(this.home);
  }

}
