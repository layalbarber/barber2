import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientProfilePageRoutingModule } from './client-profile-routing.module';

import { ClientProfilePage } from './client-profile.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { NgxProgressiveImgLoaderModule } from "ngx-progressive-img-loader";
import { CustomPipeModule } from 'src/app/modules/custom-pipe.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomPipeModule,
    NgxProgressiveImgLoaderModule,
    ClientProfilePageRoutingModule,
    NgxIonicImageViewerModule,
    TranslateModule
  ],
  declarations: [ClientProfilePage]
})
export class ClientProfilePageModule {}
