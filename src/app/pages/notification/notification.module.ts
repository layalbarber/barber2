import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEditorModule,
    AngularEditorModule,
    NotificationPageRoutingModule,
    TranslateModule,
    NgxProgressiveImgLoaderModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
