import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
declare var google: any;
@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.page.html',
  styleUrls: ['./add-adress.page.scss'],
})
export class AddAdressPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address_type: any;
  state: string;
  street: string;
  city: string;
  country: string;
  lat: number = 3.202778;
  lng: number = 73.220680;
  address: string;
  latitude: number;
  longitude: number;
  latt: any;
  long: any;
  markers: any;
  latttt: any;
  longgg: any;
  language: any;
  cityErr: any;
  countryErr: any;
  stateErr: any;
  streetErrr: any;
  constructor(
    private geolocaion: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    private util: UtilService,
    private api: ApiService,
    private navCtrl: NavController,
  ) {
 
    this.api.get("appSetting").subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem("lat",res.data.lat);
          localStorage.setItem("lang",res.data.lang);
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
    this.backbutton();
    this.latt = localStorage.getItem("lat");
    this.long = localStorage.getItem("lang");
  }

  ngOnInit() {

    this.initPage();
  }
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.initPage();
    })
    this.language = localStorage.getItem('lan');
  }


  initPage() {
    setTimeout(() => {
      this.latt = localStorage.getItem("lat");
      this.long = localStorage.getItem("lang");

      this.loadMap(this.latt, this.long);
    }, 500);
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

  closeModal() {
    this.navCtrl.back();
  }

  backbutton() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('tabs/profile/edit');
    })
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
      google.maps.event.addListener(marker, 'dragend', function () {
        this.markerlatlong = marker;
        this.latttt = marker.getPosition().lat();
        this.longgg = marker.getPosition().lng();
        console.log("marker", this.markerlatlong.latttt, this.markerlatlong.longgg);

        this.latt = this.markerlatlong.latttt;
        this.long = this.markerlatlong.longgg;

        localStorage.setItem("lat", this.latt);
        localStorage.setItem("lang", this.long);
      });
    }
  }

  saveAddress() {
    this.latt = localStorage.getItem("lat");
    this.long = localStorage.getItem("lang");
    let data = {
      country: this.country,
      street: this.street,
      city: this.city,
      state: this.state,
      let: this.latt,
      long: this.long,
      user_id: localStorage.getItem("userId")
    }
    this.api.postWithHeader('addAddress', data).subscribe((success: any) => {
      if (success.success) {
        this.navCtrl.navigateForward('/selectServices');
        if (this.language == 'en') {
          this.util.showToast('address added successfullly')
        } else {
          this.util.showToast('تمت إضافة العنوان بنجاح')
        }
      }
    }, error => {
      this.cityErr = error.error.errors.city[0];
      this.countryErr = error.error.errors.country[0];
      this.stateErr = error.error.errors.state[0];
      this.streetErrr = error.error.errors.street[0];
    })
  }
}
