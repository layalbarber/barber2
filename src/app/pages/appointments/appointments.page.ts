import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ApiService } from "src/app/services/api.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.page.html",
  styleUrls: ["./appointments.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentsPage implements OnInit {
  @ViewChild("table") public table: DatatableComponent;
  data: any = [];
  public isDark: boolean = localStorage.getItem("theme") == "dark";
  public appointments = new Array();
  public ColumnMode = ColumnMode;
  public rows = [];
  currancy: string;

  constructor(private api: ApiService, private util: UtilService) {
    this.currancy = localStorage.getItem("currency_symbol");
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.api.getWithHeader("appointments").subscribe(
      (success: any) => {
        if (success.success) {
          console.log("success", success);
          this.data = success.data;
          this.rows = this.data;
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  dorefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 500);
  }
}
