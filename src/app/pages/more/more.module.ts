import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorePageRoutingModule } from './more-routing.module';

import { MorePage } from './more.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxIonicImageViewerModule,
    MorePageRoutingModule,
    TranslateModule
  ],
  declarations: [MorePage]
})
export class MorePageModule {}
