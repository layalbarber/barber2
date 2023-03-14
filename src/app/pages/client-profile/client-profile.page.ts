import { ViewerModalComponent } from "ngx-ionic-image-viewer";
import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-client-profile",
  templateUrl: "./client-profile.page.html",
  styleUrls: ["./client-profile.page.scss"],
})
export class ClientProfilePage implements OnInit {
  public segment: string = "appointments";
  public client: any = {};
  allBooking: any = [];
  data: any = {};
  currency: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private util: UtilService,
    private navCtrl: NavController
  ) { 
    this.currency = localStorage.getItem("currency_symbol");
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.getClientDetail();
    console.log("hello");

    this.api
      .getWithHeader(
        "showClient/" + this.activeRoute.snapshot.paramMap.get("clientId")
      )
      .subscribe((res: any) => {
        console.log("res success", res);
        this.data = res;
      });
  }

  public getClientDetail() {
    this.api
      .getWithHeader(
        "showClient/" + this.activeRoute.snapshot.paramMap.get("clientId")
      )
      .subscribe((res: any) => {
        console.log("res: ", res);
        if (res.success) {
          this.client = res;
          this.allBooking = res.all_booking;
          console.log("hello", this.allBooking);
          this.client.isImgLoaded = false;
        }
      });
  }

  next(i) {
    console.log(i);
    localStorage.setItem("client-profile-id", i);
    this.navCtrl.navigateForward("viewAppointment");
  }
  goToAppointmentDetail(appointmentDetail: any) {
    this.util.dataTransfer = appointmentDetail;
    this.util.navCtrl.navigateForward("viewAppointment");
  }

  async openViewer() {
    const presentingElement = await this.util.modalCtrl.getTop();
    const modal = await this.util.modalCtrl.create({
      component: ViewerModalComponent,
      componentProps: {
        src: this.client.detail.imagePath + this.client.detail.image,
      },
      cssClass: "ion-img-viewer",
      keyboardClose: true,
      mode: "ios",
      swipeToClose: true,
      animated: true,
      presentingElement: presentingElement,
      showBackdrop: true,
    });
    return await modal.present();
  }
}
