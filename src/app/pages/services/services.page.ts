import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ModalController } from "@ionic/angular";
import { DeletePage } from "src/app/modals/delete/delete.page";

@Component({
  selector: "app-services",
  templateUrl: "./services.page.html",
  styleUrls: ["./services.page.scss"],
})
export class ServicesPage implements OnInit {
  public items = new Array();
  public searchKeyword: string;

  constructor(
    private api: ApiService,
    private util: UtilService,
    private modal: ModalController
  ) {
    
  }
language:any;
  ngOnInit() {}

  ionViewWillEnter() {
    
    this.getServices();this.language = localStorage.getItem('lan');
    console.log(this.language)
  }

  public getServices(): void {
    this.api.getWithHeader("services").subscribe((res: any) => {
      console.log("res: ", res);
      if (res.success) {
        this.items = res.data.category;
      }
    });
  }

  async serviceDelete(id) {
    console.log(id);
    localStorage.setItem("isFrom", "service");
    const modal = await this.modal.create({
      component: DeletePage,
      cssClass: "delete",
    });
    localStorage.setItem("emp-id", id);
    modal.onDidDismiss().then((res) => {
      this.getServices();
    });
    return modal.present();
  }

  public updateService(service) {
    this.util.dataTransfer = service;
    this.util.navCtrl.navigateForward("service/Update");
  }

  public addCategory() {
    this.util.navCtrl.navigateForward("service/Add");
  }
}
