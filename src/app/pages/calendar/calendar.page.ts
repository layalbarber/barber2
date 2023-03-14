import { UtilService } from "src/app/services/util.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import * as moment from "moment";
import {
  CalendarComponentOptions,
  CalendarModal,
  CalendarResult,
  CalendarModalOptions,
} from "ion2-calendar";
import { ModalController, NavController } from "@ionic/angular";
import { AppComponent } from 'src/app/app.component';
import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.page.html",
  styleUrls: ["./calendar.page.scss"],
})
export class CalendarPage implements OnInit {

  isFav: any = true;
  public staff: any = new Array();
  public eventSource = [];
  public viewTitle;
  public isToday: boolean;
  public selectedEmp: any;
  select = 0;

  public optionsRange: CalendarComponentOptions = {
    pickMode: "range",
    showToggleButtons: true,
  };
  active: any = '2';
  btn: any = [
    {
      id: '1',
      name: "list-circle-outline",
    },
    {
      id: '2',
      name: 'calendar-outline'
    }
  ]
  upComingAppointment: any;
  curency: any;
  approved: any;
  canceled: any;
  seemore: string = "See More";
  isExpand: any = false;
  changed(item) {
    console.log(item);
    this.active = item
  }

  public bookingData: any = [];
  id: any;
  calendar: any = {
    mode: localStorage.getItem("calenderMode")
      ? localStorage.getItem("calenderMode")
      : "week",
    currentDate: new Date(),
    dir: 'rtl',
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        console.log('here?')
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function () {
        return "MonMH";
      },
      formatMonthViewTitle: function () {
        return "testMT";
      },
      formatWeekViewDayHeader: function () {
        return "MonWH";
      },
      formatWeekViewTitle: function () {
        return "testWT";
      },
      formatWeekViewHourColumn: function () {
        return "testWH";
      },
      formatDayViewHourColumn: function () {
        return "testDH";
      },
      formatDayViewTitle: function () {
        return "testDT";
      },
    },
    locale: 'ar-SA',
  };
  constructor(
    private util: UtilService,
    private api: ApiService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private translateService: TranslateService,
    private ngxservice: NgxUiLoaderService,

  ) {


    this.api.getWithHeader("employees").subscribe(
      (success: any) => {
        console.log("success", success);
        this.staff = success.data;
        this.api.newLogin.next(true);
      },
      (error) => {
        console.log("error", error);
      }
    );

    if (localStorage.getItem('message') == 'no') {
      this.util.navCtrl.navigateForward('/signin');
    }



  }

  transform(value: any): any {
    const date = new Date(value);

    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return date.toLocaleString(this.translateService.currentLang, options);
  }

  ngOnInit() {
    this.eventSource = [];
    this.language = localStorage.getItem('lan');
    this.api.get('allAppointments').subscribe((success: any) => {
      if (success.success) {
        console.log(success.data);
        this.curency = success.data.currency.currency_symbol
        this.upComingAppointment = success.data.pending_appointment
        this.approved = success.data.approved_appointment
        this.canceled = success.data.cancel_appointment
      }
    }, err => {
      console.log(err)
    });

    this.api.getWithHeader("CalAppointments").subscribe((res: any) => {
      console.log('res', res.data)
      if (res.data && res.data.length != 0) {
        res.data.forEach((element) => {
          let start_time = moment(element.date + " " + element.start_time).format(
            "YYYY-MM-DD HH:mm"
          );
          let end_time = moment(element.date + " " + element.end_time).format(
            "YYYY-MM-DD HH:mm"
          );
          this.eventSource.push({
            title: element.userDetails.name,
            startTime: new Date(start_time),
            endTime: new Date(end_time),
            allDay: false,
            appointmentDetail: element
          });
        });
      }
      this.calendar.eventSource = this.eventSource
    });
  }



  ionViewWillEnter() {
    this.getStaff(null);
    localStorage.removeItem("SelectAddress")
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  language: any;

  onEventSelected(event) {
    console.log(event);
    localStorage.setItem('client-profile-id', event.appointmentDetail.id)
    this.util.dataTransfer = event.appointmentDetail;
    this.util.navCtrl.navigateForward("viewAppointment");
  }

  singleapp(item: any) {
    console.log(item);
    localStorage.setItem('client-profile-id', item.id);
    this.util.navCtrl.navigateForward("viewAppointment");
    this.api.appointment = "appointmet";
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  expandToogle(val: any) {
    if (val.isExpand == true) {
      val.isExpand = false;
    } else {
      val.isExpand = true;
    }

    if (val.isExpand == true) {
      if (this.language == "en") {
        this.seemore = "See Less"
      } else if (this.language == "ro") {
        this.seemore = "Arata mai putin"
      } else {
        this.seemore = "رؤية أقل"
      }
    } else {
      if (this.language == "en") {
        this.seemore = "See More"
      } else if (this.language == "ro") {
        this.seemore = "Vezi mai mult"
      } else {
        this.seemore = "شاهد المزيد"
      }
    }

  }


  onTimeSelected(event) { }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  employee(emp) {
    console.log("emp", emp);
    this.id = emp.emp_id;
    this.util.id = this.id;
    console.log("this.id", this.id);
    this.navCtrl.navigateForward("employee-detail");
  }

  public async presentCalendarPicker() {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDay();
    const options: CalendarModalOptions = {
      from: new Date(currentYear - 5, 0, 1),
      to: new Date(currentYear + 5, 11.1),
      defaultScrollTo: new Date(currentYear, currentMonth, currentDay),
      monthFormat: 'YYYY Y MM M ',
      weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    };
    const modal = await this.modalController.create({
      component: CalendarModal,
      componentProps: { options },
      cssClass: "my-custom-class",
    });
    modal.onDidDismiss().then((data) => {
      const date: CalendarResult = data.data;
      if (date != null) {
        this.calendar.currentDate = date.dateObj;
      }
    });
    return await modal.present();
  }

  public getStaff(event): void {
    this.api.getWithHeader("employees").subscribe((res: any) => {
      if (res.success) {
        this.staff = res.data;
        if (this.staff && this.staff.length != 0) {
          this.selectedEmp = this.staff[0].id;
          if (event != null) {
            event.target.complete();
          }
        }
      }
    });
    this.api.get('allAppointments').subscribe((success: any) => {
      if (success.success) {
        console.log(success.data);
        this.curency = success.data.currency.currency_symbol
        this.upComingAppointment = success.data.pending_appointment
        this.approved = success.data.approved_appointment
        this.canceled = success.data.cancel_appointment
      }
    }, err => {
      console.log(err)
    });

    this.ngOnInit();
  }
}
