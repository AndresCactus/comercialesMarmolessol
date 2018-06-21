import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetailsPage } from '../pages/details/details';
import { DeliveriesPage } from '../pages/deliveries/deliveries';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { DatePicker } from '@ionic-native/date-picker';

import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { OneSignal } from '@ionic-native/onesignal';

export const firebaseConfig = {
  apiKey: "AIzaSyBkV4PH2vWvS-xp2I9E1w2rUcHZI8AKJgY",
  authDomain: "marmoles-sol-comerciales.firebaseapp.com",
  databaseURL: "https://marmoles-sol-comerciales.firebaseio.com",
  projectId: "marmoles-sol-comerciales",
  storageBucket: "marmoles-sol-comerciales.appspot.com",
  messagingSenderId: "280479563871"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DeliveriesPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Volver',
      backButtonIcon: "ios-arrow-back",
      iconMode: 'ios',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      swipeBackEnabled: false,
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DeliveriesPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Keyboard,
    DatePicker,
    Geolocation,
    OneSignal,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
