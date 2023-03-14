import { UtilService } from "src/app/services/util.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-gallary",
  templateUrl: "./gallary.page.html",
  styleUrls: ["./gallary.page.scss"],
})
export class GallaryPage implements OnInit {
  public gallery = new Array();

  constructor(private api: ApiService, private util: UtilService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getAllImages();
  }

  public getAllImages(): void {
    this.api.getWithHeader("gallery").subscribe((res: any) => {
      if (res.success) {
        this.gallery = res.data;
      }
    });
  }

  public updateGallery(item: any) {
    this.util.dataTransfer = item;
    this.util.navCtrl.navigateForward("addGallary/Update");
    localStorage.setItem("gallery_id", item.gallery_id);
  }
}
