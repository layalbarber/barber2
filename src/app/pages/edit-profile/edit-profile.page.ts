import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UtilService } from "./../../services/util.service";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Camera } from "@ionic-native/camera/ngx";
import { countryCode } from "src/environments/environment";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  public myForm: FormGroup;
  public changePassword: FormGroup;
  public openCloseTime: FormGroup;
  public isImgChange: boolean = false;
  public imagePreview: string;
  public item: any = {
    open_time: "10:00",
    close_time: "20:00",
  };
  image: any;
  language: any;
  code = "+968";
  cCode: any = countryCode;
  old: any;
  newp: any;
  cnf: any;
  constructor(
    private util: UtilService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private camera: Camera
  ) {
    this.myForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: ["", Validators.compose([Validators.required])],
      code: ["+968", Validators.compose([Validators.required])],
      image: ["", Validators.compose([Validators.required])]
    });
    this.getUser();
    this.changePassword = this.formBuilder.group({
      old_password: [
        "",
        Validators.compose([Validators.required]),
      ],
      new_password: [
        "",
        Validators.compose([Validators.required]),
      ],
      confirm_password: [
        "",
        Validators.compose([Validators.required]),
      ],
    });
  }

  ngOnInit() {
    this.getUser();
    this.language = localStorage.getItem('lan');
  }

  public getUser(): void {
    this.api.getWithHeader("showProfile").subscribe((res: any) => {
      if (res.success) {
        this.myForm.patchValue({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          code: res.data.code
        });
        this.imagePreview = res.data.imagePath + res.data.image;
      }
    });
  }

  public editProfile() {
    let temp = this.myForm.value;
    temp.image = this.image;
    this.api.postWithHeader("editProfile", temp).subscribe((res: any) => {
      if (res.success) {
        if (this.language == 'en') {
          this.util.success("Success!", "Profile has been updated successfully");
        } else {
          this.util.success("نجاح!", "تم تحديث الملف الشخصي بنجاح")
        }
        this.util.updateCode.next(true);
        this.util.navCtrl.navigateForward('/tabs/more')
      }
    });
  }

  public async updatePassword() {
    if (
      this.changePassword.value.new_password ==
      this.changePassword.value.confirm_password
    ) {
      this.api
        .postWithHeader("changePassword", this.changePassword.value)
        .subscribe((res: any) => {
          console.log("res: ", res);
          this.old = "";
          this.newp = "";
          this.cnf = "";
          if (res.success) {
            if (this.language == 'en') {
              this.util.success(
                "Success!",
                "Your password is change successfully"
              );
            } else {
              this.util.success(
                "نجاح!",
                "تم تغيير كلمة المرور الخاصة بك بنجاح"
              );
            }
            this.changePassword.reset();
          }
        }, (err: any) => {
          console.log(err);
          this.old = err.error.errors.old_password;
          this.newp = err.error.errors.new_password;
          this.cnf = err.error.errors.confirm_password;
        });
    } else {
      const alert = await this.util.alertCtrl.create({
        header: "Alert",
        message: "Password and Confirm Password does not match",
        buttons: ["OK"],
      });
      await alert.present();
    }
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
        this.image = file_uri;
        this.isImgChange = true;
        this.imagePreview = "data:image/jpg;base64," + file_uri;
        this.editProfile();
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
        this.isImgChange = true;
        this.image = file_uri;
        this.imagePreview = "data:image/jpg;base64," + file_uri;
        this.editProfile();
      });
  }

  public updateSalonTime() {
    console.log("before", this.item);
    this.tConverter(this.item.open_time);
    this.tConverter(this.item.close_time);
    console.log(this.item);
    this.api
      .postWithHeader("changeSalonTime", this.item)
      .subscribe((res: any) => {
        console.log("res: ", res);
        if (res.success) {
          this.util.success("نجاح!", "تم التحديث بنجاح ...");
        } else {
          this.util.error("خطأ!", "هناك خطأ ما!");
        }
      });
  }

  public tConverter(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? "AM" : "PM";
      time[0] = +time[0] % 12 || 12;
      time[0] = ("0" + time[0]).slice(-2);
    }
    return time.join("");
  }

  public convertTime12to24 = (time12h) => {
    time12h = time12h.replace(/.{2}$/, " $&");
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };
}
