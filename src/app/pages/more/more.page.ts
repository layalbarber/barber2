import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  public aboutCompany:any = new Object();
  public state:any = 1;
  
  constructor(
    private api: ApiService,
    private util: UtilService,
    public modalController: ModalController
  ) { 
  } 

  ngOnInit():void {
    this.util.updateCode.subscribe(() => this.getProfile());
  }

  getProfile():void {
    this.api.getWithHeader('showProfile').subscribe((res:any) => {
      if(res.success) {
        this.aboutCompany = res.data;
        this.api.newLogin.next(true);
      }
    });
  }

  async openViewer() {
    const presentingElement = await this.modalController.getTop()
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: this.aboutCompany.imagePath+this.aboutCompany.image
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      mode: 'ios',
      swipeToClose: true,
      animated: true,
      presentingElement: presentingElement,
      showBackdrop: true
    });
    return await modal.present();
  }

  public onLogOut() {
    localStorage.removeItem('admin_token'); 
    this.util.navCtrl.navigateRoot('signin');
  }

  public logScrolling(ev) {
    if (ev.detail.scrollTop >= 50) this.state = 2; 
    else this.state = 1;
  }
}
