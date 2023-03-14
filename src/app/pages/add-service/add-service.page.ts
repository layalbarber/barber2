import { ActivatedRoute } from "@angular/router";
import { UtilService } from "./../../services/util.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ActionSheetController } from "@ionic/angular";
import { Camera } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-add-service",
  templateUrl: "./add-service.page.html",
  styleUrls: ["./add-service.page.scss"],
})
export class AddServicePage implements OnInit {
  public serviceForm: FormGroup;
  public employees = new Array();
  public locations = new Array();
  public categories = new Array();
  public action: string;
  public isImgChange: boolean = false;
  public serviceImage: string = "../../../assets/img/appicons/add-photo.svg";
  public cat: any;
  public state: number = 1;
  select: any;
  genderr: any;
  err: any;
  currancy: string;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private util: UtilService,
    private activeRoute: ActivatedRoute,
    private actionCtrl: ActionSheetController
  ) {
    this.action = this.activeRoute.snapshot.paramMap.get("action");
    this.currancy = localStorage.getItem("currency_symbol");
    this.serviceForm = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      cat_id: ["", Validators.compose([Validators.required])],
      price: ["", Validators.compose([Validators.required])],
      image: [
        "../../../assets/img/appicons/add-photo.svg",
      ],
      status: ["", Validators.compose([Validators.required])],
      time: ["", Validators.compose([Validators.required])],
      gender: ["", Validators.compose([Validators.required])],
      service_id:[""]
    });

    if (this.action === "Update") {
      this.cat = this.util.dataTransfer.category_id;
      this.serviceImage =
        this.util.dataTransfer.imagePath + this.util.dataTransfer.image;
      this.serviceForm.patchValue({
        name: this.util.dataTransfer.name,
        cat_id: this.util.dataTransfer.cat_id,
        service_id: this.util.dataTransfer.service_id,
        price: this.util.dataTransfer.price,
        time: this.util.dataTransfer.time,
        gender: this.util.dataTransfer.gender,
        image: this.util.dataTransfer.imagePath + this.util.dataTransfer.image,
        status: this.util.dataTransfer.status,
      });
      this.genderr = this.util.dataTransfer.gender;
      console.log(
        "this.util.dataTransfer.cat_id",
        this.util.dataTransfer.cat_id
      );
      console.log(
        "this.util.dataTransfer.service_id",
        this.util.dataTransfer.service_id
      );
      console.log("this.util.dataTransfer.name", this.util.dataTransfer.name);
      console.log("this.util.dataTransfer.price", this.util.dataTransfer.price);
      console.log("this.util.dataTransfer.time", this.util.dataTransfer.time);
      console.log(
        "this.util.dataTransfer.gender",
        this.util.dataTransfer.gender
      );
      console.log("this.dataTransfer.status", this.util.dataTransfer.status);
      console.log("this.util.dataTransfer", this.util.dataTransfer);
    }
    this.language = localStorage.getItem('lan')
  }

  ngOnInit(): void {
    this.getCategories();
  }
  language:any;
  public onSave() {
    if (this.action === "Add") {
      this.api
        .postWithHeader("addService", this.serviceForm.value)
        .subscribe((res: any) => {
          if (res.success) {
            
            if(this.language == 'en'){
              this.util.success(
                "Success!",
                "Service has been added successfully"
              );
            }
            else{
              this.util.success(
                "نجاح!",
                "تمت إضافة الخدمة بنجاح"
              );
            }
            this.util.navCtrl.navigateBack("services");
          }
        }, err => {
          console.log('err');
          this.err = err.error.errors;
          console.log(this.err)
        });
    } else {
      let temp = this.serviceForm.value;
      temp.id = this.util.dataTransfer.id;
      if (!this.isImgChange) delete temp["image"];
      this.api
        .postWithHeader("editService", this.serviceForm.value)
        .subscribe((res: any) => {
          if (res.success) {
            if(this.language == 'en'){
              this.util.success(
                "Success!",
                "Service has been updated successfully"
              );
            }
            else{
              this.util.success(
                "نجاح!",
                "تم تحديث الخدمة بنجاح"
              );
            }
            this.util.navCtrl.navigateBack("services");
          }
        });
    }
  }
  gender: any = [
    {
      label: "Male",
      checked: true,
    },
    {
      label: "Female",
      checked: false,
    },
    {
      label: "Both",
      checked: false,
    },
  ];
  changeGenderValue(e) {
    console.log(e.detail);
    this.gender.forEach((element) => {
      if (element.label == e.detail.value) {
        element.checked = true;
        this.select = e.detail.value;
        console.log("this.select radio", this.select);
      } else {
        element.checked = false;
      }
    });
  }

  public getCategories(): void {
    this.api.getWithHeader("services").subscribe((res: any) => {
      if (res.success) {
        if (res.data && res.data.length != 0) {
          this.categories = res.data.category;
          if (this.action === "Add") {
            this.serviceForm.patchValue({
              category_id: res.data[0].id,
            });
          }
        }
      }
    });
  }


  public addDiscount() {
    let val = this.serviceForm.value.discount + 1;
    this.serviceForm.patchValue({
      discount: val,
    });
  }

  public subDiscount() {
    if (this.serviceForm.value.discount != 0) {
      let val = this.serviceForm.value.discount - 1;
      this.serviceForm.patchValue({
        discount: val,
      });
    }
  }

  async albumSheet() {
    const actionSheet = await this.actionCtrl.create({
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
          handler: () => {},
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
        this.isImgChange = true;
        this.serviceImage = "data:image/jpg;base64," + file_uri;
        this.serviceForm.patchValue({
          image: file_uri,
        });
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
        this.serviceImage = "data:image/jpg;base64," + file_uri;
        this.isImgChange = true;
        this.serviceForm.patchValue({
          image: file_uri,
        });
      });
  }

  public categoryCompare(c1: any): boolean {
    return c1 === parseInt(this.serviceForm.value.category_id);
  }

  public branchCompare(c1: any): boolean {
    return c1 === parseInt(this.serviceForm.value.location);
  }

  public employeeCompare(c1: any): boolean {
    return c1 === parseInt(this.serviceForm.value.employee_id);
  }

  public compareFn(o1, o2) {
    return o1.id === o2.id;
  }

  public logScrolling(ev) {
    if (ev.detail.scrollTop >= 50) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }
}
