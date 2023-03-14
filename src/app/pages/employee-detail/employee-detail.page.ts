import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import { Camera } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
})
export class EmployeeDetailPage implements OnInit {
  galleryPreviewImage: string;
  galleryForm: any;
  isImgChange: boolean;
  singleEmployee: any;
  services:any = [];
  services_emp:any = [];
  status: any;
  services_id:any = [];
  name:string = '';
  phone:string = '';
  email:string = '';
  sunopen:any;
  sunclose:any;
  monopen:any;
  monclose:any;
  tueopen:any;
  tueclose:any;
  wedopen:any;
  wedclose:any;
  thuopen:any;
  thuclose:any;
  friopen:any;
  friclose:any;
  satopen:any;
  satclose:any;
  image: any;
  imagePreview: any;
  dataaa: any;
  errors: any;
  errorsPhone: any;
  giveService: any;

  constructor(
    private util:UtilService,
    private api:ApiService,
    private camera:Camera,
    private navCtrl:NavController
  ) { }

  ngOnInit() {

  
    console.log('this.uti.employeeId',this.util.id)
    this.api.getWithHeader('allServices').subscribe((success:any) => {
      console.log('success',success);
      this.services = success.data;
      console.log('services',this.services)
     
      this.api.getWithHeader('showEmployee/' + this.util.id).subscribe((success:any) => {
        console.log('success',success);
        this.singleEmployee = success.data;
        console.log('singleyo',this.singleEmployee.saturday.open);
        
        this.status = success.data.status
        this.services_emp = success.data.services;
        this.galleryPreviewImage = this.singleEmployee.imagePath + this.singleEmployee.image;
        this.singleEmployee.services.forEach(element => {
          this.services.forEach((item,index) => {
            console.log('item loop',item);
            console.log('hi element',element);
            if(element.service_id == item.service_id){
              item.isChecked = true;
              console.log('this.services_id',this.services_id);
              console.log('true');
            }
          });
        });
      }, error => {
        console.log('error',error)
      });
    }, error => {
      console.log('error',error)
    })
  }

  select(e){
    console.log('e select',e)
  }

  ionViewWillEnter(){
   
  }
  loop:any = [
    {
      name:"Home"
    },
    {
      name:"Salon"
    },
    {
      name:"Both"
    }
  ]

  checkEvent(e){
    console.log('hi',e);
    setTimeout(() => {
      this.services.forEach((element,index)=> {
        if(element.service_id == e){
          if(element.isChecked == true){
            this.services_id.push(e);
          }
        }
      });
      this.services.forEach((element,index)=> {
        if(element.service_id == e){
          if(element.isChecked == false){
            this.services_id.pop(element.service_id);
          }
        }
      });
      console.log('this.services_idddd',this.services_id)
    }, 500);
  }
  checsk(e){
    this.giveService = e.detail.value
  }

  editEmployee(){
    console.log(this.imagePreview)
    let data = {
      emp_id:this.singleEmployee.emp_id,
      name:this.name,
      phone:this.phone,
      email:this.email,
      service_id:this.services_id,
      image:this.imagePreview,
      status:this.status,
      sunopen:this.sunopen,
      sunclose:this.sunclose,
      monopen:this.monopen,
      monclose:this.monclose,
      tueopen:this.tueopen,
      tueclose:this.tueclose,
      wedopen:this.wedopen,
      wedclose:this.wedclose,
      thuopen:this.thuopen,
      thuclose:this.thuclose,
      friopen:this.friopen,
      friclose:this.friclose,
      satopen:this.satopen,
      satclose:this.satclose,
      give_service:this.giveService
    }
    this.api.postWithHeader('editEmployee',data).subscribe((success:any) => {
      console.log('success')
      if(success.success){
        this.navCtrl.navigateForward('tabs/calendar');
      }
    }, error => {
      this.errors = error.error.errors.name[0];
      this.errorsPhone = error.error.errors.phone[0];
      console.log('error',error);
      this.util.showToast(error.error.errors.service_id[0]);
      let language = localStorage.getItem('lan');
      if(language == 'en'){
        this.util.showToast('Something Went Wrong');
      }else{
        this.util.showToast('هناك خطأ ما');
      }

    });


 
  }

  async albumSheet() {
    const actionSheet = await this.util.sheetCtrl.create({
      header: 'Albums',
      mode: 'ios',
      cssClass: 'image-picker', 
      buttons: [{
        text: 'Gallery',
        icon: 'images-sharp',
        handler: () => {
          this.getGallery();
        }
      }, {
        text: 'Camera',
        icon: 'camera-sharp',
        handler: () => {
          this.getCamera();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }
  

  public getCamera():any {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }).then(file_uri => {
      this.galleryPreviewImage = "data:image/jpg;base64," + file_uri;
      this.image = file_uri
      this.isImgChange = true;
      this.imagePreview = file_uri
    });
  }

  public getGallery():any {
    this.camera.getPicture({ 
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    }).then(file_uri => {
      this.galleryPreviewImage = "data:image/jpg;base64," + file_uri;
      this.image = file_uri
      this.isImgChange = true;
      this.imagePreview = file_uri
    });
  }


}
