import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.page.html",
  styleUrls: ["./delete.page.scss"],
})
export class DeletePage implements OnInit {
  constructor(
    private modal: ModalController,
    private api: ApiService,
    private util: UtilService
  ) {}

  isFrom: any;
  ngOnInit() {
    this.isFrom = localStorage.getItem("isFrom");
    this.language = localStorage.getItem('lan')
  }

  close() {
    this.modal.dismiss();
  }
  language:any;
  delete() {
    if (this.isFrom != "service") {
      this.api
        .getWithHeader("deleteEmployee/" + localStorage.getItem("modal-id"))
        .subscribe(
          (success: any) => {
            console.log("success", success);
            if (success.success == true) {
              if(this.language == 'en'){
                this.util.success("Success ..!", "Employee Deleted Successfully");
              }
              else{
                this.util.success("نجاح ..!", "تم حذف الموظف بنجاح"); 
              }
              this.modal.dismiss();
            } else {
              this.modal.dismiss();
            }
          },
          (err) => {
            console.log("err", err);
          }
        );
    } else {
      this.api
        .getWithHeader("deleteService/" + localStorage.getItem("emp-id"))
        .subscribe(
          (success: any) => {
            console.log("success", success);
            if (success.success == true) {
              if(this.language == 'en'){
                this.util.success("Success ..!", "Service Deleted Successfully");
              }
              else{
                this.util.success("نجاح ..!", "تم حذف الخدمة بنجاح");
              }
              this.modal.dismiss();
            } else {
              this.modal.dismiss();
            }
          },
          (err) => {
            console.log("err", err);
          }
        );
    }
  }
}
