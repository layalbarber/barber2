import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import {
  NavController,
  AlertController,
  ActionSheetController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

export interface bookingData {
  customer_id: string;
  service_id: string;
  location_id: string;
  duration: number;
  employee_id: string;
  date: string;
  time: string;
  payment: number;
  discount: number;
  payment_type: string;
  currency_code: string;
  payment_amount: number;
  coupon_price: number;
  payment_token: string;
}

@Injectable({
  providedIn: "root",
})
export class UtilService {
  public dataTransfer: any = new Object();
  public updateCode = new BehaviorSubject(false);
  public currencyCode: any;
  public currencySymbol: any;
  public activeStep: any = 0;
  id: any;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public sheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private toasts: ToastrService
  ) {}

  public success(msg, desc) {
    this.toasts.success(msg, desc, {
      progressAnimation: "decreasing",
      progressBar: true,
      onActivateTick: true,
      closeButton: true,
      positionClass: "toast-bottom-center",
    });
  }

  public error(msg, desc) {
    this.toasts.error(msg, desc, {
      progressAnimation: "decreasing",
      progressBar: true,
      positionClass: "toast-bottom-center",
    });
  }

  public async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000,
      mode: "ios",
      cssClass: "leaveToast",
    });
    toast.present();
  }
}
