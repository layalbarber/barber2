import { UtilService } from "src/app/services/util.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ModalController, NavController } from "@ionic/angular";
import { BookingSuccessComponent } from 'src/app/modal/booking-success/booking-success.component';
import { loadavg } from 'os';
import { SelectAddressPage } from "../select-address/select-address.page";

@Component({
  selector: "app-select-services",
  templateUrl: "./select-services.page.html",
  styleUrls: ["./select-services.page.scss"],
})
export class SelectServicesPage implements OnInit {
  public price: number = 0;
  public selectedServices: Array<any>;
  public selBranch: any;
  public qtyDeleteState: boolean = false;
  public categoriesData: Array<any> = new Array();
  public branches: Array<any> = new Array();
  category: any = [];
  buttonColor: string;
  s: any;
  total: number = 0;
  date: string | number | Date;
  serviceArray: any = [];
  todayy: string;
  empId: any;
  id: any;
  objdate: string;
  language: any;
  show: any;
  address: any;
  currency: string;
  constructor(
    private api: ApiService,
    private util: UtilService,
    private modal: ModalController,
    private navCtrl: NavController
  ) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    this.todayy = yyyy + "-" + mm + "-" + dd;
    this.date = this.todayy;

    this.currency = localStorage.getItem("currency_symbol");
  }
  clients: any = [];
  services: any = [];
  ngOnInit() {
    this.language = localStorage.getItem('lan')
    this.api.getWithHeader("allClients").subscribe(
      (success: any) => {
        console.log("success", success);
        this.clients = success.data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.api.getWithHeader("showSalon").subscribe(
      (success: any) => {
        console.log("success", success);
        this.show = success.data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.getWithHeader("services").subscribe(
      (success: any) => {
        console.log("success", success);
        this.services = success.data;
        this.category = success.data.category;
        this.category.forEach((element, index) => {
          this.s = this.category[0].name;
          this.services = this.category[0].service;
          element.isItemChecked = this.category[0].service;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  local: any = [];
  verifyEvent(id) {
    let selected = 0;
    this.local = JSON.parse(localStorage.getItem("booking-detail"))
      ? JSON.parse(localStorage.getItem("booking-detail"))
      : [];
    this.services.map((item, index) => {
      if (item.service_id == id) {
        item.isItemChecked = !item.isItemChecked;
      }
      if (item.isItemChecked == true) {
        selected++;
        if (item.service_id == id) {
          this.price = item.price;
          console.log(this.price);
          this.total += this.price;
          console.log("total", this.total);
          if(this.show.home_charges){
            this.api.totall = this.total + JSON.parse(this.show.home_charges);
          }else{
            this.api.totall = this.total;
          }
          this.local.push(item);
          this.serviceArray.push(item.service_id);
          console.log(this.serviceArray);
          localStorage.setItem("total", this.api.totall);
        }
      }
    });
    this.services.map((item, index) => {
      if (item.isItemChecked == false) {
        selected--;
        if (item.service_id == id) {
          this.price = item.price;
          this.total -= this.price;
          if(this.show.home_charges){
            this.api.totall = this.total + JSON.parse(this.show.home_charges);
          }else{
            this.api.totall = this.total;
          }
          this.local.pop(item);
          this.serviceArray.pop(item.service_id);
          console.log(this.serviceArray);
        }
      }
    });
    localStorage.setItem("booking-detail", JSON.stringify(this.local));
    localStorage.setItem("total", this.api.totall);
  }
  mydate(ev) {
    let d = new Date(this.date);
    let obj = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.objdate = obj;
    console.log(obj);
    localStorage.setItem("date", obj);
    let data = {
      date: obj,
    };
    this.api.postWithHeader("timeslot", data).subscribe(
      (success: any) => {
        console.log("success", success);
        if (success.success) {
          console.log("data");
          console.log("success", success);
          this.time = success.data;
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }
  time: any = [];
  selectBtn: any;
  btnChanged(c) {
    this.s = c;
    console.log(c, "c");
    console.log(this.s);
    this.buttonColor = "#345465";
    this.category.forEach((element) => {
      if (element.name == c) {
        this.services = element.service;
      }
    });
  }
 
  emp: any = [];
  activeSlot(i) {
    this.emp = [];
    console.log(i);
    this.selectBtn = i;
    let data = {
      start_time: this.selectBtn,
      service: this.serviceArray,
      date: localStorage.getItem("date"),
      booking_at:this.booking_at
    };
    this.api.postWithHeader("selectEmp", data).subscribe(
      (success: any) => {
        console.log(success);
        if (success.success == true) {
          console.log("success", success);
          this.emp = success.data;
        }else{
          let lan = localStorage.getItem('lan')
          if(lan == 'en'){
            this.util.showToast('There is no Employee Available at this time');
          }else{
            this.util.showToast('لا يوجد موظف متاح في هذا الوقت')
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  isBook: boolean = true;

  async presentModal(){
    const modal = await this.modal.create({
      component:BookingSuccessComponent,
      cssClass:'booking'
    });
    return await modal.present();
  }

  booking_at:any = ''; 

  checkSelect(e){
    console.log(e);    
    this.booking_at = e.detail.value;
    console.log(this.booking_at);    
  }

  async addressSelect(){
    localStorage.setItem('userId',this.id);
    const modal = await this.modal.create({
      component:SelectAddressPage
    });
    modal.onDidDismiss().then((res) => {
      this.address = JSON.parse(localStorage.getItem("SelectAddress"));
    })
    return await modal.present();
  }

  book() {
    this.address = JSON.parse(localStorage.getItem("SelectAddress"));
    console.log(this.address);
    let data = {
      user_id: this.id,
      service_id: this.serviceArray,
      date: localStorage.getItem("date"),
      start_time: this.selectBtn,
      payment: this.total,
      emp_id: this.empId,
      booking_at:this.booking_at,
      extra_charges:this.show.home_charges,
      address_id:this.address && this.booking_at =="Home" ? this.address.address_id : 'Null'
    };

 if(this.language == 'en') {
  if (this.id == null) {
    this.util.showToast("Please Select User");
  }
  else if(this.booking_at == ''){
    this.util.showToast("Please Select Service_At")
  }
  else if(this.address == null && this.booking_at == "Home"){
    this.util.showToast("Please Select Address")
  }  else if (this.objdate == null) {
    this.util.showToast("Please Select the Date");
  } else if (this.id == null && this.objdate == null) {
    this.util.showToast("Please Select User and Date");
  }
 else if (this.serviceArray.length == 0) {
    this.util.showToast("Select Services");
  } else if (this.selectBtn == null) {
    this.util.showToast("Please Select Time Slot");
  } else if (this.empId == null) {
    this.util.showToast("Please Select Employee");
  } else {
    this.isBook = false;
    this.api.postWithHeader("addAppointment", data).subscribe(
      (success: any) => {
        if (success.success) {
          localStorage.removeItem("date");
          localStorage.removeItem("emp-id");
          localStorage.removeItem("total");
          localStorage.removeItem("booking-detail");
          localStorage.removeItem("SelectAddress")
          this.selectBtn = null;
          this.presentModal();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
 }
 if(this.language == 'ar'){
  if (this.id == null) {
    this.util.showToast("الرجاء تحديد المستخدم");
  } else if (this.objdate == null) {
    this.util.showToast("يرجى تحديد التاريخ");
  } else if (this.id == null && this.objdate == null) {
    this.util.showToast("يرجى تحديد المستخدم والتاريخ");
  } else if (this.serviceArray.length == 0) {
    this.util.showToast("حدد الخدمات");
  } else if (this.selectBtn == null) {
    this.util.showToast("يرجى تحديد الفترة الزمنية");
  } else if (this.empId == null) {
    this.util.showToast("الرجاء تحديد الموظف");
  } else {
    this.isBook = false;
    this.api.postWithHeader("addAppointment", data).subscribe(
      (success: any) => {
        if (success.success) {
          localStorage.removeItem("date");
          localStorage.removeItem("emp-id");
          localStorage.removeItem("total");
          localStorage.removeItem("booking-detail");
          this.selectBtn = null;
          this.presentModal();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
 }
  }

  service(){

  }

  verifyEmp(id) {
    let selected = 0;
    this.emp.map((item) => {
      item.isItemChecked = false;
      if (item.emp_id == id) {
        item.isItemChecked = !item.isItemChecked;
      }
      if (item.isItemChecked == true) {
        selected++;
        if (item.emp_id == id) {
          this.empId = item.emp_id;
          console.log(id);
          console.log("emp Id Selected ", this.empId);
        }
      }
    });
  }

  select(e) {
    console.log(e.detail.value);
    this.id = e.detail.value;
    ``;
  }
}
