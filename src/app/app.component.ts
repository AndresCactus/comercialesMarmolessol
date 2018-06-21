import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireAuth } from 'angularfire2/auth';

import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  login = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public afAuth: AngularFireAuth,
              private oneSignal: OneSignal,
              private keyboard: Keyboard,
              private nativeStorage: NativeStorage) {

    this.pages = [
      { title: 'Inicio', component: HomePage, icon:"home"},
      { title: 'Historial', component: ListPage, icon:"history"}
    ];

    this.platform.ready().then(() => {

      if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
        this.oneSignal
          .startInit("7fcd5258-22e2-42a3-9d31-efef14af7796", "834379778148")
          .endInit();
      }
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.disableScroll(false);
    });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logOut(){
    this.afAuth.auth.signOut();
    this.nav.setRoot(this.login, null, { animate: true, animation: 'wp-transition', direction: 'forward'}, null);
  }

}
