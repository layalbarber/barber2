import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-salon-add',
  templateUrl: './salon-add.page.html',
  styleUrls: ['./salon-add.page.scss'],
})
export class SalonAddPage implements OnInit {
  public activeStapes: number = 1;
  img: string;
  imageUri: any;
  base64Image: any;
  image: any;
  name: any;
  desc: any;
  base64ToGallery: any;
  public galleryPreviewImage: string = "../../../assets/img/appicons/add-photo.svg";
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  lat: number = 3.202778;
  lng: number = 73.220680;
  latt: any;
  long: any;
  latitude: number;
  longitude: number;
  map: any;
  markers: any;
  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private api: ApiService,
    private sanitize: DomSanitizer,
    private geoLocation: Geolocation,
    private platform: Platform
  ) { }

  ngOnInit() {
    let latlng = { lat: this.lat, lng: this.lng };
    console.log('this.latlng on ngonit', latlng)
  }
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.initPage();

    })
  }
  initPage() {
    this.geoLocation.getCurrentPosition().then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
      console.log(result.coords.latitude);
      console.log(result.coords.longitude);
      this.latt = result.coords.latitude;
      this.long = result.coords.longitude;
      console.log('lat find ready', this.latt)
      console.log('long find ready', this.long)
    })
  }
  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    let mapOption = {
      center: latLng,
      zoom: 14,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    }
    let element = document.getElementById('map');
    this.map = new google.maps.Map(element, mapOption);
    let marker = new google.maps.Marker(
      {
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
    let content = `
          <div id="myId" class="item item-thumbnail-left item-text-wrap">
            <ion-item>
              <ion-row>
                <h6> `+ marker.title + `</h6>
                <h6> `+ marker.position + `</h6>
              </ion-row>
            </ion-item>
          </div>
        `
    this.addInfoWindow(marker, content);
    marker.setMap(this.map);
  }
  addInfoWindow(marker, content) {
    {
      let infoWindow = new google.maps.InfoWindow(
        {
          content: content
        });
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
      var geocoder = new google.maps.Geocoder();

      google.maps.event.addListener(marker, 'dragend', function () {
        this.markerlatlong = marker.getPosition();
        console.log("latlong   " + this.markerlatlong);
        console.log("lat    " + marker.getPosition().lat());
        console.log("long   " + marker.getPosition().lng());
        this.latt = marker.getPosition().lat();
        console.log('this.lat under finding', this.latt);
        this.long = marker.getPosition().lng();
        console.log('this.ing under find', this.long)
        geocoder.geocode({
          'latLng': this.markerlatlong
        }, function (results, status) {
          if (status ==
            google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              alert(results[1].formatted_address);
              console.log(results[1].formatted_address);
              this.zipcode = results[1].zipcode;
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);

          }
        });
      });
    }
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.img = 'data:image/jpeg;base64,' + imageData;
      this.imageUri = imageData;
      console.log('img', this.img)
      this.base64Image = this.sanitize.bypassSecurityTrustResourceUrl(this.img);
      this.image = this.imageUri;
      this.galleryPreviewImage = this.img
      console.log('this.image', this.image);
      console.log('imagedata ', this.base64Image);
    }, (err) => {
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  select: any;
  gender: any = [
    {
      label: 'Male',
      checked: true
    },
    {
      label: 'Female',
      checked: false
    },
    {
      label: 'Both',
      checked: false
    }
  ]



  next() {
    this.activeStapes = 2;
  }
  previous1() {
    this.activeStapes = 1;
  }
  previous2() {
    this.activeStapes = 2;
  }
  step3() {
    console.log('step 3');
  }
  steptwo() {
    this.activeStapes = 3;
  }


  changeGenderValue(e) {
    console.log(e.detail)
    this.gender.forEach(element => {
      if (element.label == e.detail.value) {
        element.checked = true;
        this.select = e.detail.value;
        console.log('this.select radio', this.select)
      } else {
        element.checked = false;
      }
    });
  }
}
