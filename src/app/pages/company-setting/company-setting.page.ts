import { UtilService } from "../../services/util.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Camera } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-company-setting",
  templateUrl: "./company-setting.page.html",
  styleUrls: ["./company-setting.page.scss"],
})
export class CompanySettingPage implements OnInit {
  public myForm: FormGroup;
  public give_service: any;
  public changePassword: FormGroup;
  public isImgChange: boolean = false;
  public imagePreview: string;
  data: any = {};
  status: any;
  gender = this.data.gender;
  wedTmp: any = {
    wedchecked: 0
  }
  sunTmp: any = {
    sunchecked: 0
  }
  munTmp: any = {
    monchecked: 0
  }
  tueTmp: any = {
    tuechecked: 0
  }
  thuTmp: any = {
    thuchecked: 0
  }
  friTmp: any = {
    frichecked: 0
  }
  satTmp: any = {
    satchecked: 0
  }
  sunCheck: any = {
    sunchecked: 0
  }
  monCheck: any = {
    monchecked: 0
  }
  tueCheck: any = {
    tuechecked: 0
  }
  wedCheck: any = {
    wedchecked: 0
  }

  thuCheck: any = {
    thuchecked: 0
  }
  friCheck: any = {
    frichecked: 0
  }
  satCheck: any = {
    satchecked: 0
  }
  image: any;
  errrs: any;
  constructor(
    private util: UtilService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private camera: Camera
  ) {
    this.getUser();
    this.myForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      website: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required])],
      address: ["", Validators.compose([Validators.required])],
      city: ["", Validators.compose([Validators.required])],
      state: ["", Validators.compose([Validators.required])],
      zipcode: ["", Validators.compose([Validators.required])],
      give_service: ["", Validators.compose([Validators.required])],
      latitude: [22.3039, Validators.compose([Validators.required])],
      longitude: [70.8022, Validators.compose([Validators.required])],
      home_charges: ["", Validators.compose([Validators.required])],
      country: ["", Validators.compose([Validators.required])],
      sunopen: [Validators.compose([Validators.required])],
      sunclose: [Validators.compose([Validators.required])],
      desc: ["", Validators.compose([Validators.required])],
      gender: ["", Validators.compose([Validators.required])],
      monopen: [Validators.compose([Validators.required])],
      monclose: [Validators.compose([Validators.required])],

      tueopen: [Validators.compose([Validators.required])],
      tueclose: [Validators.compose([Validators.required])],

      wedopen: [Validators.compose([Validators.required])],
      wedclose: [Validators.compose([Validators.required])],

      thuopen: [Validators.compose([Validators.required])],
      thuclose: [Validators.compose([Validators.required])],

      friopen: [Validators.compose([Validators.required])],
      friclose: [Validators.compose([Validators.required])],

      satopen: [Validators.compose([Validators.required])],
      satclose: [Validators.compose([Validators.required])],

      sunday: [Validators.compose([Validators.required])],
      monday: [Validators.compose([Validators.required])],
      wednesday: [Validators.compose([Validators.required])],
      thursday: [Validators.compose([Validators.required])],
      friday: [Validators.compose([Validators.required])],
      saturday: [Validators.compose([Validators.required])],
      tuesday: [Validators.compose([Validators.required])],
    });
  }

  changeGender(e) {
    console.log(e.detail.value);
    this.gender = e.detail.value;
  }
  select(e) {
    console.log(e);
  }
  ngOnInit() {
    this.getUser();
    this.language = localStorage.getItem('lan');
  }
  desc: any;
  country: any;
  isChecked: any = false;
  sundayOpen: any;
  sundayClose: any;
  monopen: any;
  monclose: any;
  tueopen: any;
  tueclose: any;
  wedopen: any;
  wedclose: any;
  thuopen: any;
  thuclose: any;
  friopen: any;
  friclose: any;
  satopen: any;
  satclose: any;
  isChecked2: any = false;
  isChecked3: any = false;
  isChecked4: any = false;
  isChecked5: any = false;
  isChecked6: any = false;
  isChecked7: any = false;
  language: any;
  change() {
    if (this.isChecked == false) {
      this.isChecked = true
      this.sundayOpen = null;
      this.sundayClose = null;
    }
    else {
      this.isChecked = false

    }
    console.log(this.isChecked)
  }

  monday() {
    if (this.isChecked2 == false) {
      this.isChecked2 = true
      this.monopen = null;
      this.monclose = null;
    }
    else {
      this.isChecked2 = false

    }
    console.log(this.isChecked2)
  }

  tuesday() {
    if (this.isChecked3 == false) {
      this.isChecked3 = true
      this.tueopen = null;
      this.tueclose = null;
    }
    else {
      this.isChecked3 = false

    }
    console.log(this.isChecked3)
  }

  wednesday() {
    if (this.isChecked4 == false) {
      this.isChecked4 = true
      this.wedopen = null;
      this.wedclose = null;
    }
    else {
      this.isChecked4 = false

    }
    console.log(this.isChecked4)
  }

  thursday() {
    if (this.isChecked5 == false) {
      this.isChecked5 = true
      this.thuopen = null;
      this.thuclose = null;
    }
    else {
      this.isChecked5 = false

    }
    console.log(this.isChecked5)
  }

  friday() {
    if (this.isChecked6 == false) {
      this.isChecked6 = true
      this.friopen = null;
      this.friclose = null;
    }
    else {
      this.isChecked6 = false

    }
    console.log(this.isChecked6)
  }

  saturday() {
    if (this.isChecked7 == false) {
      this.isChecked7 = true
      this.satopen = null;
      this.satclose = null;
    }
    else {
      this.isChecked7 = false

    }
    console.log(this.isChecked7)
  }

  save() {
    let data = {
      sun: this.sundayOpen,
      sunclose: this.sundayOpen,
      monopen: this.monopen,
      monclose: this.monclose,
      thuopen: this.thuopen,
      thuclose: this.thuclose,
      tueopen: this.tueopen,
      tueclose: this.tueclose,
      wedopen: this.wedopen,
      wedclose: this.wedclose,
      friopen: this.friopen,
      friclose: this.friclose,
      satopen: this.satopen,
      satclose: this.satclose
    }
    console.log(data);
  }

  public getUser(): void {
    this.api.getWithHeader("showSalon").subscribe((res: any) => {
      console.log("res: ", res);
      if (res.success) {
        this.data = res.data;
        console.log("red", this.data);
        this.myForm.patchValue({
          name: res.data.name,
          website: res.data.website,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          city: res.data.city,
          state: res.data.state,
          zipcode: res.data.zipcode,
          Latitude: res.data.Latitude,
          longitude: res.data.longitude,
          open_time: res.data.open_time,
          close_time: res.data.close_time,
          description: res.data.description,
          give_service: res.data.give_service,
          home_charges: res.data.home_charges,
          country: res.data.country,
          desc: res.data.desc,
          gender: res.data.gender,
        });
        this.imagePreview = res.data.imagePath + res.data.image;
      }
    });
  }
  checsk(event): void {

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

  public editCompanyProfile() {

    let temp = this.myForm.value;
    console.log(temp);
    if (this.isImgChange) {
      temp.image = this.imagePreview;
    }
    temp.gender = this.gender;
    temp.sunday = this.sunCheck.checked;
    temp.monday = this.monCheck.checked;
    temp.tuesday = this.tueCheck.checked;
    temp.wednesday = this.wedCheck.checked;
    temp.thursday = this.thuCheck.checked;
    temp.friday = this.friCheck.checked;
    temp.saturday = this.satCheck.checked;
    temp.gender = this.gender;
    temp.desc = this.desc;
    temp.country = this.country;
    temp.image = this.image;
    this.api.postWithHeader("editSalon", temp).subscribe((res: any) => {
      if (res.success) {
        console.log('res', res);
        if (this.language == 'en') {
          this.util.success("Success!", "Profile has been updated successfully");
        }
        else {
          this.util.success("نجاح!", "تم تحديث الملف الشخصي بنجاح");
        }

        this.util.updateCode.next(true);
        this.util.navCtrl.navigateForward('setting');
      }
    }, (err: any) => {
      console.log("err", err);
      this.errrs = err.error.errors;
    });
  }

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
        this.myForm.patchValue({
          image: file_uri,
        });
        this.image = file_uri
        this.isImgChange = true;
        this.imagePreview = "data:image/jpg;base64," + file_uri;
        this.editCompanyProfile();
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
        this.myForm.patchValue({
          image: file_uri,
        });
        this.image = file_uri;
        this.isImgChange = true;
        this.imagePreview = "data:image/jpg;base64," + file_uri;
        this.editCompanyProfile();
      });
  }
}
