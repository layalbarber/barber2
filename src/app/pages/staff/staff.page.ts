import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ModalController, NavController } from "@ionic/angular";
import { DeletePage } from "src/app/modals/delete/delete.page";

@Component({
  selector: "app-staff",
  templateUrl: "./staff.page.html",
  styleUrls: ["./staff.page.scss"],
})
export class StaffPage implements OnInit {
  public staff: any = new Array();
  public searchKeyword: string;
  id: any;
  language:any;
  constructor(
    private api: ApiService,
    private util: UtilService,
    private navCtrl: NavController,
    private modal: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getStaff();
    this.language = localStorage.getItem('lan');
  }
  employee(emp) {
    console.log("emp", emp);
    this.id = emp.emp_id;
    this.util.id = this.id;
    console.log("this.id", this.id);
    this.navCtrl.navigateForward("employee-detail");
  }

  getStaff(): void {
    this.api.getWithHeader("employees").subscribe((res: any) => {
      console.log("res: ", res);
      if (res.success) {
        this.staff = res.data;
      }
    });
  }

  async modacl(id) {
    const modal = await this.modal.create({
      component: DeletePage,
      cssClass: "delete",
    });
    localStorage.setItem("modal-id", id);
    localStorage.setItem('isFrom','staff')
    modal.onDidDismiss().then((res) => {
      this.getStaff();
    });
    return await modal.present();
  }

  public addStaff() {
    this.util.navCtrl.navigateForward("add-employees");
  }

  public updateStaff(emp: any) {
    this.util.dataTransfer = emp;
    this.util.navCtrl.navigateForward("addStaff/Update");
  }
}
