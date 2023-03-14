import { Component, OnInit } from "@angular/core";
import { Camera } from "@ionic-native/camera/ngx";
import { UtilService } from "src/app/services/util.service";
import { ApiService } from "src/app/services/api.service";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-employees",
  templateUrl: "./add-employees.page.html",
  styleUrls: ["./add-employees.page.scss"],
})
export class AddEmployeesPage implements OnInit {
  public galleryPreviewImage: string =
    "../../../assets/img/appicons/add-photo.svg";
  galleryForm: any;
  isImgChange: boolean;
  services: any = [];
  singleEmployee = [];
  status: any;
  services_emp = [];
  services_id: any = [];
  name: string = "";
  phone: string = "";
  email: string = "";
  sunopen: any;
  sunclose: any;
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
  data: any = {};
  imagUri: any;
  err: any = [];
  namerr: any;
  phoneErr: any;
  serviceErr: any;
  imageErr: any;
  emailerr: any;
  giveService: any;
  giveErr: any;
  password: any = "";
  give_serviceerr: any;
  passworderr: any;
  er: any;

  constructor(
    private camera: Camera,
    private util: UtilService,
    private api: ApiService,
    private navCtrl: NavController,
    private translate: TranslateService
  ) { }
  language: any;
  ngOnInit() {
    console.log("this.uti.employeeId", this.util.id);
    this.api.getWithHeader("allServices").subscribe(
      (success: any) => {
        console.log("success", success);
        this.services = success.data;
        console.log("services", this.services);

        if (this.util.id) {
          this.api.getWithHeader("showEmployee/" + this.util.id).subscribe(
            (success: any) => {
              console.log("success", success);
              this.singleEmployee = success.data;
              this.services_emp = success.data.services;
            },
            (error) => {
              console.log("error", error);
            }
          );
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
    this.language = localStorage.getItem("lan");
  }

  ionViewWillEnter() {
    this.api.getWithHeader("showSalon").subscribe(
      (success: any) => {
        console.log("success", success);
        if (success.success) {
          this.data = success.data;
          console.log(this.data.saturday.open);
          console.log("this.data", this.data);
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  loop: any = [
    {
      name: "Home",
    },
    {
      name: "Salon",
    },
    {
      name: "Both",
    },
  ];
  checkEvent(e) {
    console.log("this.serviceSArray", this.services_id);
    this.services.forEach((element) => {
      if (element.service_id == e) {
        if (element.isChecked == true) {
          this.services_id.push(e);
          console.log("this.services_id push", this.services_id);
        }
      }
    });
    this.services.forEach((element, index) => {
      if (element.service_id == e) {
        if (element.isChecked == false) {
          this.services_id.pop(element.service_id);
          console.log("this.services_id pop", this.services_id);
        }
      }
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
        this.galleryPreviewImage = "data:image/jpg;base64," + file_uri;
        this.isImgChange = true;
        this.imagUri = file_uri;
        console.log("imageUIR", this.imagUri);
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
        this.imagUri = file_uri;
        console.log("imageUIR", this.imagUri);
        this.isImgChange = true;
      });
  }

  checsk(e) {
    console.log(e.detail.value);
    this.giveService = e.detail.value;
  }

  addEmployee() {
    let translateData: any;
    let tData: any;

    this.translate.get("addEmplErr").subscribe((data: any) => {
      translateData = data;
    });

    let data = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      service_id: this.services_id,
      sunopen: this.sunopen,
      sunclose: this.sunclose,
      monopen: this.monopen,
      monclose: this.monclose,
      tueopen: this.tueopen,
      tueclose: this.tueclose,
      wedopen: this.wedopen,
      wedclose: this.wedclose,
      thuopen: this.thuopen,
      thuclose: this.thuclose,
      friopen: this.friopen,
      friclose: this.friclose,
      satopen: this.satopen,
      satclose: this.satclose,
      image: this.imagUri,
      give_service: this.giveService,
      password: this.password,
    };
    this.api.postWithHeader("addEmp", data).subscribe(
      (success: any) => {
        if (success.success) {
          if (this.language == "en") {
            this.util.success(
              "Success : !",
              "Employee Has Been Successfully Added"
            );
          } else {
            this.util.success("نجاح : !", "تمت إضافة الموظف بنجاح");
          }
          this.navCtrl.navigateForward("/staff");
        }
      },
      (err: any) => {
        this.er = err.error.errors;
        console.log(this.er.service_id);
        this.serviceErr = "";
        this.emailerr = "";
        this.namerr = "";
        this.phoneErr = "";
        this.passworderr = "";
        this.imageErr = "";
        this.give_serviceerr = ""
        if (this.er.service_id) {
          this.serviceErr = this.er.service_id[0];
        }
        console.log("err", this.serviceErr);
        if (this.er.email) {
          this.emailerr = this.er.email[0];
        }
        if (this.er.name) {
          this.namerr = this.er.name[0];
        }
        if (this.er.phone) {
          this.phoneErr = this.er.phone[0];
        }
        if (this.er.password) {
          this.passworderr = this.er.password[0];
        }
        if (this.er.image) {
          this.imageErr = this.er.image[0];
        }
        if (this.er.give_service) {
          this.give_serviceerr = this.er.give_service[0];
        }
      }
    );
  }

}
