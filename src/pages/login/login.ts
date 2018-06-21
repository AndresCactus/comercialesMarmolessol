import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, Loading, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  home = HomePage;

  loginForm: FormGroup;
  user: Observable<firebase.User>;
  public loading:Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public statusBar: StatusBar,
              public menu: MenuController,
              public platform: Platform,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              private oneSignal: OneSignal,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private nativeStorage: NativeStorage) {
                
              afs.firestore.settings({ timestampsInSnapshots: true });
              
              this.menu.enable(false);
              this.loginForm = this.formBuilder.group({
                email: ['', Validators.required],
                password: ['', Validators.required]
              });
              this.user = afAuth.authState;
  }


  logIn(){

    if (this.platform.is('core') || this.platform.is('mobileweb')){
      this.afAuth.auth.languageCode = 'es';
      this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then((user) => {

        this.afs.collection('users').doc(this.loginForm.value.email.toLowerCase())
          .valueChanges()
          .subscribe(item => this.nativeStorage.setItem('dataUser', item));

        this.menu.enable(true);
        this.statusBar.styleLightContent();
        this.navCtrl.setRoot(this.home, null, { animate: true, animation: 'wp-transition', direction: 'forward' }, null);

      }, (err) => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: err.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
    else{
      this.oneSignal.getIds().then(id => {
        console.log(id.userId);

        console.log("Email:" + this.loginForm.value.email.toLowerCase());
        console.log("Password:" + this.loginForm.value.password);

        this.afAuth.auth.languageCode = 'es';
        this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then((user) => {

          this.afs.collection('users').doc(this.loginForm.value.email.toLowerCase()).update({
            push_id: id.userId
          });

          this.afs.collection('users').doc(this.loginForm.value.email.toLowerCase())
            .valueChanges()
            .subscribe(item => this.nativeStorage.setItem('dataUser', item));

          this.menu.enable(true);
          this.statusBar.styleLightContent();
          this.navCtrl.setRoot(this.home, null, { animate: true, animation: 'wp-transition', direction: 'forward' }, null);

        }, (err) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: err.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
      });
    }


    

    
  }

  goToResetPassword(){
    this.menu.enable(false);
    this.statusBar.styleLightContent();
    this.navCtrl.push('ResetPasswordPage');
  }

}
