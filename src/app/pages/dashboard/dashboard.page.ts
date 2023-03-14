import { UtilService } from './../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public dashboardData:any = new Object();
  currancy: string;
 
  constructor(
    private util: UtilService,
    private api: ApiService
  ) { 
    this.getDashboard(); 
  }

  ngOnInit() {
  this.currancy = localStorage.getItem("currency_symbol");
  }

  getDashboard():void {
    this.api.getWithHeader('dashboard').subscribe((res:any) => {
      if(res.success) {
        this.dashboardData = res.data;
      }
    })
  }

}
