import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit {
  addressDiv: any = [];
  selectAddresss: any;
  isFrom: string;
  constructor(private modal: ModalController,
    private api: ApiService,
    private util: UtilService){

  }
  ngOnInit() {
    this.isFrom = localStorage.getItem('isFrom');
    this.api.getWithHeader("clientAddress/" + localStorage.getItem('userId')).subscribe(
      (success: any) => {
        if (success.success) {
          this.addressDiv = success.data;

        }
      },
      (err) => {}
    );
  }

  ionViewWillEnter() {

    
    this.isFrom = localStorage.getItem('isFrom');
    this.api.getWithHeader("clientAddress/" + localStorage.getItem('userId')).subscribe(
      (success: any) => {
        if (success.success) {
          this.addressDiv = success.data;

        }
      },
      (err) => {}
    );


  }


  close() {
    this.modal.dismiss();
  }

  go(){
    this.modal.dismiss();
    this.util.navCtrl.navigateForward("add-adress")
  }
  selectAddress(item) {
    console.log(item);
    localStorage.setItem("SelectAddress", JSON.stringify(item));
    this.modal.dismiss(item);
  }

  isDelete: boolean = true;


}
