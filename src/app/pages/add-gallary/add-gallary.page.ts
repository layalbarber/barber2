import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Camera } from "@ionic-native/camera/ngx";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-add-gallary",
  templateUrl: "./add-gallary.page.html",
  styleUrls: ["./add-gallary.page.scss"],
})
export class AddGallaryPage implements OnInit {
  public galleryForm: FormGroup;
  public branch: any = new Array();
  public action: string;
  public isImgChange: boolean = false;
  public galleryPreviewImage: string =
    "../../../assets/img/appicons/add-photo.svg";
language:any;
  constructor(
    private api: ApiService,
    private camera: Camera,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private util: UtilService
  ) {
    this.action = this.activeRoute.snapshot.paramMap.get("action");

    this.galleryForm = this.formBuilder.group({
      
      image: ["", Validators.compose([Validators.required])],
      
      
    });

    if (this.action === "Update") {
      this.galleryPreviewImage =
        this.util.dataTransfer.imagePath + this.util.dataTransfer.image;
      this.galleryForm.patchValue({
        image: this.util.dataTransfer.imagePath + this.util.dataTransfer.image,
      });
    }
    this.language = localStorage.getItem('lan')
  }

  ngOnInit(): void {}
  
  public onSave() {
    console.log("galleryForm :", this.galleryForm.value);
    this.api
      .postWithHeader("addGallery", this.galleryForm.value)
      .subscribe((res: any) => {
        if (res.success) {
         if(this.language == 'en'){
          this.util.success("Success!", "Gallery has been added successfully");
          this.util.navCtrl.navigateBack("gallery");
         }else{
          this.util.success("نجاح!", "تمت إضافة المعرض بنجاح");
          this.util.navCtrl.navigateBack("gallery");
         }
        }
      });
  }

  delete() {
    {
      this.api
        .getWithHeader("deleteGallery/" + localStorage.getItem("gallery_id"))
        .subscribe((res: any) => {
          if (res.success) {
            if(this.language == 'en'){
              this.util.success(
                "Success!",
                "Gallery has been Deleted successfully"
              );
            }
            else{
              this.util.success(
                "نجاح!",
                "تم حذف المعرض بنجاح"
              );
            }
            this.util.navCtrl.navigateBack("gallery");
          }
        });
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
        this.galleryPreviewImage = "data:image/jpg;base64," + file_uri;
        this.galleryForm.patchValue({
          image: file_uri,
        });
        this.isImgChange = true;
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
        this.galleryForm.patchValue({
          image: file_uri,
        });
        this.isImgChange = true;
      });
  }

  public compareFn(c1: any): boolean {
    return c1 === parseInt(this.galleryForm.value.category_id);
  }
}
