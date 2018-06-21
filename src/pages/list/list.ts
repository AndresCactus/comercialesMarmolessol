import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { AngularFirestore } from 'angularfire2/firestore';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  detailsPage = DetailsPage;

  items: Array<{date: string, client: string, town: string, cp: string,id: string}>;
  printedItems;

  selectDate;
  userVisits;

  counter = 8;
  new_loading = 2;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afs: AngularFirestore,
              private nativeStorage: NativeStorage) {

            afs.firestore.settings({ timestampsInSnapshots: true });

            this.nativeStorage.getItem('dataUser').then((data) => {

              afs.collection('visits', ref => ref.where('userMail', '==', data.mail).orderBy("createdAt", "desc"))
                  .valueChanges()
                  .subscribe(items => {
                    this.parseDate(items)
                  });
            });

  }

  parseDate(items){
    var aux;

    for (let i in items){

      aux = new Date(items[i].createdAt.seconds*1000);

      aux = ((aux.getDate() < 10) ?  0 + "" + aux.getDate() : aux.getDate()) + "/" 
      + (((aux.getMonth()+1) < 10) ?  0 + "" + (aux.getMonth()+1) : (aux.getMonth()+1)) + "/" 
      + (aux.getFullYear() +'').slice(2, 4);

      items[i].createdAt = aux;

    };

    this.userVisits = items;
    this.setItems();

  }

  setItems() {
    this.items = this.userVisits;
    this.printedItems = this.items.slice(0, this.counter);

    console.log("setItems:",this.printedItems);
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.client.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  filterTown(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.town.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  filterCP(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.cp.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  filterDate(val) {
    this.setItems();

    val = val.split("-");
    val = val[2]+"/"+val[1]+"/"+val[0][2]+val[0][3];

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item['createdAt'].includes(val);
      });
    }
  }

  eraseDate(){
    this.selectDate = "";
    setTimeout(() => {
      this.setItems();  
    }, 100);

  }

  showDetails(item){
    this.navCtrl.push(this.detailsPage, {details: item});
  }

  doInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {

    var new_elemens = this.printedItems.slice(this.counter, this.counter + this.new_loading);
    console.log('NEW ELEMENTS', new_elemens);
    console.log('contador --> ',this.counter);
    
    this.counter = this.counter + this.new_loading;
    new_elemens.forEach(element => {
      this.items.push( element );
    });
    
    console.log('Async operation has ended');
    infiniteScroll.complete();
    
    if(new_elemens.length == 0){
      console.log('fin');
      infiniteScroll.enable(false);
    }

  }, 500);
}

}
