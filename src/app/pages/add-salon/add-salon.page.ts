import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Camera } from "@ionic-native/camera/ngx";
import { ApiService } from 'src/app/services/api.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-add-salon',
  templateUrl: './add-salon.page.html',
  styleUrls: ['./add-salon.page.scss'],
})
export class AddSalonPage implements OnInit {
  isImgChange: boolean;
  imagePreview: any = '';
  gender = 'Male';
  time = '08:00'
  name: string = '';
  phone: string = '';
  website: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipcode: string = '';
  country: string = '';
  sunopen: any = '';
  sunclose: any = '';
  monopen: any = '';
  monclose: any = '';
  tueopen: any = '';
  tueclose: any = '';
  wedopen: any = '';
  wedclose: any = '';
  thuopen: any = '';
  thuclose: any = '';
  friopen: any = '';
  friclose: any = '';
  satopen: any = '';
  satclose: any = '';
  language: any = '';
  logoPreviewImage: any = '';
  public image: any = '../../../assets/img/placeholder.png';
  public imageL: any = '../../../assets/img/placeholder.png'
  sunCheck: any = {
    sunchecked: 0
  }
  monCheck: any = {
    sunchecked: 0
  }
  tueCheck: any = {
    sunchecked: 0
  }
  wedCheck: any = {
    sunchecked: 0
  }
  thuCheck: any = {
    sunchecked: 0
  }
  friCheck: any = {
    sunchecked: 0
  }
  satCheck: any = {
    sunchecked: 0
  }
  galleryPreviewImage: string;
  errors: any;
  logoUril: string = '';

  selectService: any;
  home_charges: any;
  latt: any;
  long: any;
  locationCordinates: any;
  timestamp: any;
  constructor(
    private util: UtilService,
    private camera: Camera,
    private api: ApiService,
    private geolocaion: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private androidPermissions: AndroidPermissions,
    private ngxService: NgxUiLoaderService,
    private translate: TranslateService
  ) {

    this.locationCordinates = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timestamp = Date.now();

    this.checkPermission();
  }

  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.enableGPS();
        } else {
          this.locationAccPermission();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  locationAccPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.enableGPS();
            },
            error => {
              console.log(error);
            }
          );
      }
    });
  }

  enableGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        this.getLocation()
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }


  ngOnInit() {
    this.initPage();
  }

  async getLocation() {
    this.geolocaion.getCurrentPosition().then((response) => {
      this.locationCordinates.latitude = response.coords.latitude;
      this.locationCordinates.longitude = response.coords.longitude;
      this.locationCordinates.accuracy = response.coords.accuracy;
      this.locationCordinates.timestamp = response.timestamp;
      this.latt = response.coords.latitude;
      this.long = response.coords.longitude;
      console.log("lat long", this.latt, this.long);
    }).catch((error) => {
      console.log('Error', error);
    });
  }

  sunOpenTime: any = '';
  sunCloseTime: any = '';
  monOpenTime: any = '';
  monCloseTime: any = '';
  tueOpenTime: any = '';
  tueCloseTime: any = '';
  wedOpenTime: any = '';
  wedCloseTime: any = '';
  thuOpenTime: any = '';
  thuCloseTime: any = '';
  friOpenTime: any = '';
  friCloseTime: any = '';
  satOpenTime: any = '';
  satCloseTime: any = '';
  check(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday open', time);
    this.sunOpenTime = time;
    return time;
  }
  check2(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.sunCloseTime = time;
    return time;
  }
  check3(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.monOpenTime = time;
    return time;
  }
  check4(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.monCloseTime = time;
    return time;
  }
  check5(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.tueOpenTime = time;
    return time;
  }
  check6(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.tueCloseTime = time;
    return time;
  }
  check7(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('wed close', time);
    this.wedOpenTime = time;
    return time;
  }
  check8(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.wedCloseTime = time;
    return time;
  }
  check9(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.thuOpenTime = time;
    return time;
  }
  check10(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.thuCloseTime = time;
    return time;
  }
  check11(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.friOpenTime = time;
    return time;
  }
  check12(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.friCloseTime = time;
    return time;
  }
  check13(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.satOpenTime = time;
    return time;
  }
  check14(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " ";
    console.log('sunday close', time);
    this.satCloseTime = time;
    return time;
  }
  desc: any = '';

  initPage() {
    this.geolocaion.getCurrentPosition().then(result => {
      console.log(result.coords.latitude);
      console.log(result.coords.longitude);

      this.latt = result.coords.latitude;
      this.long = result.coords.longitude;
      localStorage.setItem('Lat', this.latt);
      localStorage.setItem('Lng', this.long);
    })
  }
  ionViewWillEnter() {
    this.initPage();
    this.language = localStorage.getItem('lan')
  }

  isLog: boolean = false;
  isLogsun: boolean = false;
  isLogmon: boolean = false;
  isLogtue: boolean = false;
  isLogwed: boolean = false;
  isLogthu: boolean = false;
  isLogfri: boolean = false;
  isLogsat: boolean = false;
  save() {
    this.isLog = true;
    this.ngxService.start();
    let translateData: any;
    let tData: any;
    this.translate.get("addSalonErr").subscribe((data: any) => {
      translateData = data;
    });
    let data = {
      owner_id: localStorage.getItem('owner_id'),
      image: this.imagePreview,
      logo: this.logoUril,
      name: this.name,
      phone: this.phone,
      gender: this.gender,
      website: this.website,
      address: this.address,
      zipcode: this.zipcode,
      country: this.country,
      sunopen: this.sunOpenTime,
      sunclose: this.sunCloseTime,
      monopen: this.monOpenTime,
      monclose: this.monCloseTime,
      tueopen: this.tueOpenTime,
      tueclose: this.tueCloseTime,
      wedopen: this.wedOpenTime,
      wedclose: this.wedCloseTime,
      thuopen: this.thuOpenTime,
      thuclose: this.thuCloseTime,
      friopen: this.friOpenTime,
      friclose: this.friCloseTime,
      satopen: this.satOpenTime,
      satclose: this.satCloseTime,
      latitude: this.latt,
      longitude: this.long,
      desc: this.desc,
      state: this.state,
      city: this.city,
      sunCheck: this.sunCheck.checked,
      monCheck: this.monCheck.checked,
      tueCheck: this.tueCheck.checked,
      wedCheck: this.wedCheck.checked,
      thuCheck: this.thuCheck.checked,
      friCheck: this.friCheck.checked,
      satCheck: this.satCheck.checked,
      home_charges: this.home_charges,
      give_service: this.selectService,
    }

    if (this.sunOpenTime == "" && this.sunCloseTime == "") {
      data.sunCheck = false;
      this.isLogsun = true;

    }
    if (this.sunCheck.checked == true) {
      data.sunCheck = true;
      this.isLogsun = false;
    }

    if (this.monOpenTime == "" && this.monCloseTime == "") {
      data.monCheck = false;
      this.isLogmon = true;
      console.log('trues')
    }
    if (this.monCheck.checked == true) {
      data.monCheck = true;
      this.isLogmon = false;
    }

    if (this.tueOpenTime == "" && this.tueCloseTime == "") {
      data.tueCheck = false;
      this.isLogtue = true;
      console.log('trues')
    }
    if (this.tueCheck.checked == true) {
      data.tueCheck = true;
      this.isLogtue = false;
    }

    if (this.wedOpenTime == "" && this.wedCloseTime == "") {
      data.wedCheck = false;
      this.isLogwed = true;
      console.log('trues')
    }
    if (this.wedCheck.checked == true) {
      data.wedCheck = true;
      this.isLogwed = false;
    }

    if (this.thuOpenTime == "" && this.thuCloseTime == "") {
      data.thuCheck = false;
      this.isLogthu = true;
      console.log('trues')
    }
    if (this.thuCheck.checked == true) {
      data.thuCheck = true;
      this.isLogthu = false;
    }

    if (this.friOpenTime == "" && this.friCloseTime == "") {
      data.friCheck = false;
      this.isLogfri = true;
      console.log('trues')
    }
    if (this.friCheck.checked == true) {
      data.friCheck = true;
      this.isLogfri = false;
    }

    if (this.satOpenTime == "" && this.satCloseTime == "") {
      data.satCheck = false;
      this.isLogsat = true;
      console.log('trues')
    }
    if (this.satCheck.checked == true) {
      data.satCheck = true;
      this.isLogsat = false;
    }

    console.log('data', data);
    this.api.postWithHeader('addSalon', data).subscribe((success: any) => {
      if (success.success) {

        if (this.language == 'en') {
          this.util.success('Success !', 'Salon Added Successfully');
        }
        else {
          this.util.success('نجاح !', 'تمت إضافة الصالون بنجاح');
        }
        localStorage.setItem("admin_token", success.data.token);
        this.api.setNewLogin(true);
        this.util.navCtrl.navigateRoot('/tabs/calendar');
        this.ngxService.stop();
      }
    }, (err: any) => {
      setTimeout(() => {
        this.ngxService.stop();
        console.log(err);
        this.errors = err.error.errors;
        if (err.status == 422) {
          this.errors = err.error.errors;

          if (this.errors.home_charges[0] == "The Extra Charge field is required.") {
            this.errors.home_charges[0] = translateData.home_charges;
          }

          if (this.errors.address[0] == "The address field is required.") {
            this.errors.address[0] = translateData.address;
          }
          if (this.errors.logo[0] == "The logo field is required.") {
            this.errors.logo[0] = translateData.logo;
          }
          if (this.errors.city[0] == "The city field is required.") {
            this.errors.city[0] = translateData.city;
          }
          if (this.errors.country[0] == "The country field is required.") {
            this.errors.country[0] = translateData.country;
          }
          if (this.errors.desc[0] == "The desc field is required.") {
            this.errors.desc[0] = translateData.desc;
          }
          if (this.errors.friclose[0] == "The friclose field is required when fri check is false.") {
            this.errors.friclose[0] = 'الجمعة إغلاق الحقل مطلوب';
          }
          if (this.errors.friopen[0] == "The friopen field is required when fri check is false.") {
            this.errors.friopen[0] = 'الجمعة فتح الحقل مطلوب';
          }
          if (this.errors.monclose[0] == "The monclose field is required when mon check is false.") {
            this.errors.monclose[0] = 'الإثنين إغلاق الحقل مطلوب';
          }
          if (this.errors.monopen[0] == "The monopen field is required when mon check is false.") {
            this.errors.monopen[0] = 'مطلوب حقل الاثنين المفتوح';
          }
          if (this.errors.name[0] == "The name field is required.") {
            this.errors.name[0] = 'حقل الاسم مطلوب';
          }
          if (this.errors.phone[0] == "The phone field is required.") {
            this.errors.phone[0] = 'حقل الهاتف مطلوب.';
          }
          if (this.errors.satclose[0] == "The satclose field is required when sat check is false.") {
            this.errors.satclose[0] = 'السبت إغلاق الحقل مطلوب';
          }
          if (this.errors.satopen[0] == "The satopen field is required when sat check is false.") {
            this.errors.satopen[0] = 'مطلوب حقل السبت المفتوح';
          }
          if (this.errors.state[0] == "The state field is required") {
            this.errors.state[0] = 'مطلوب حقل الحالة.';
          }
          if (this.errors.sunclose[0] == "The sunclose field is required when sun check is false.") {
            this.errors.sunclose[0] = 'الأحد إغلاق الحقل مطلوب';
          }
          if (this.errors.sunopen[0] == "The sunopen field is required when sun check is false.") {
            this.errors.sunopen[0] = 'حقل الأحد المفتوح مطلوب';
          }
          if (this.errors.thuclose[0] == "The thuclose field is required when thu check is false.") {
            this.errors.thuclose[0] = 'الخميس إغلاق الحقل مطلوب';
          }
          if (this.errors.thuopen[0] == "The thuopen field is required when thu check is false.") {
            this.errors.thuopen[0] = 'مطلوب حقل الخميس المفتوح';
          }
          if (this.errors.tueclose[0] == "The tueclose field is required when tue check is false.") {
            this.errors.tueclose[0] = 'حقل إغلاق يوم الخميس مطلوب';
          }
          if (this.errors.tueopen[0] == "The tueopen field is required when tue check is false.") {
            this.errors.tueopen[0] = 'مطلوب حقل الخميس المفتوح';
          }
          if (this.errors.wedclose[0] == "The wedclose field is required when wed check is false.") {
            this.errors.wedclose[0] = 'الأربعاء إغلاق الحقل المطلوب';
          }
          if (this.errors.wedopen[0] == "The wedopen field is required when wed check is false.") {
            this.errors.wedopen[0] = 'الأربعاء فتح الحقل مطلوب';
          }
          if (this.errors.zipcode[0] == "The zipcode field is required.") {
            this.errors.zipcode[0] = 'الرمز البريدي مطلوب';
            console.log('helo')
          }
          if (this.errors.zipcode[0] == "The zipcode must be a number.") {
            this.errors.zipcode[0] = "يجب أن يكون الرمز البريدي رقمًا.";
            console.log('er');

          }
        }
        console.log(this.errors.name[0])
        console.log(this.errors);
      }, 200);
    })
  }

  checsk(e) {
    console.log(e.detail.value);
    console.log('hello');
    this.selectService = e.detail.value;
  }
  loop: any = [
    {
      name: "Home"
    },
    {
      name: "Salon"
    },
    {
      name: "Both"
    }
  ]
  async albumSheet() {
    const actionSheet = await this.util.sheetCtrl.create({
      header: "Albums",
      mode: "ios",
      cssClass: "image-picker",
      buttons: [
        {
          text: "Gallery",
          icon: "images-sharp",
          handler: () => {
            this.getGallery();
          },
        },
        {
          text: "Camera",
          icon: "camera-sharp",
          handler: () => {
            this.getCamera();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => { },
        },
      ],
    });
    await actionSheet.present();
  }

  public getCamera(): any {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {
        this.galleryPreviewImage = "data:image/jpg;base64," + file_uri;

        this.isImgChange = true;
        this.imagePreview = file_uri;

      });
  }

  public getGallery(): any {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {
        this.galleryPreviewImage = "data:image/jpg;base64," + file_uri;

        this.isImgChange = true;
        this.imagePreview = file_uri;

      });
  }

  async logoSheet() {
    const actionSheet = await this.util.sheetCtrl.create({
      header: "Albums",
      mode: "ios",
      cssClass: "image-picker",
      buttons: [
        {
          text: "Gallery",
          icon: "images-sharp",
          handler: () => {
            this.getGalleryy();
          },
        },
        {
          text: "Camera",
          icon: "camera-sharp",
          handler: () => {
            this.getCameraa();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => { },
        },
      ],
    });
    await actionSheet.present();
  }

  public getCameraa(): any {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {
        this.logoPreviewImage = "data:image/jpg;base64," + file_uri;
        this.logoUril = file_uri
      });
  }

  public getGalleryy(): any {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {
        this.logoPreviewImage = "data:image/jpg;base64," + file_uri;
        this.logoUril = file_uri
      });
  }

  changeGender(e) {
    console.log(e.detail.value);
    this.gender = e.detail.value;
  }

}
