import { UtilService } from "src/app/services/util.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.page.html",
  styleUrls: ["./view-appointment.page.scss"],
})
export class ViewAppointmentPage implements OnInit {
  public data: any = new Object();
  public state: number = 1;
  dataa: any = {};
  language: any;
  selectValue: any;
  currancy: string;

  constructor(
    private util: UtilService,
    private api: ApiService,
    private navCtrl: NavController
  ) {
    this.currancy = localStorage.getItem("currency_symbol");
  }

  ngOnInit() {
    this.api
      .getWithHeader(
        "showAppointment/" + localStorage.getItem("client-profile-id")
      )
      .subscribe(
        (success: any) => {
          console.log(success);
          this.dataa = success.data;
          this.selectValue = this.dataa.booking_status;
          this.selectStatus = success.data.payment_status;
        },
        (err) => {
          console.log(err, "er");
        }
      );

    this.language = localStorage.getItem('lan');
  }

  statusss;

  selectStatus: string = "";
  select() {


    console.log(this.selectValue);

    let data = {
      bookingId: this.dataa.id,
      status: this.selectValue,
    };
    this.api.postWithHeader("changeStatus", data).subscribe(
      (success: any) => {
        console.log("success", success);
        if (success.success) {
          if (this.language == 'en') {
            this.util.success("Success !", "Status has Been Changed")
            this.ngOnInit();
          }
          else {
            this.util.success("نجاح!", "لقد تغير الوضع");
          }
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }
  ionViewWillEnter() {
    this.data = this.util.dataTransfer;
  }

  public logScrolling(ev) {
    if (ev.detail.scrollTop >= 0) {
      this.state = 2;
    } else {
      this.state = 1;
    }
    console.log("this.state: ", this.state);
  }

  close() {
    if (this.api.appointment == "appointmet") {
      this.util.navCtrl.back();
    } else {
      this.util.navCtrl.navigateRoot("tabs/clients");
    }
  }
}
