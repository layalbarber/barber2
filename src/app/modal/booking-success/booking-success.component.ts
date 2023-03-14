import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss'],
})
export class BookingSuccessComponent implements OnInit {
  language: any;

  constructor(
    private util: UtilService,
    private translate:TranslateService
  ) { }

  ngOnInit() {
    this.language = localStorage.getItem('lan');
  }

  public navigateTo(navPath:string) {
    this.util.modalCtrl.dismiss();
    this.util.navCtrl.navigateRoot(navPath);
  }


}
