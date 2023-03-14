import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGallaryPageRoutingModule } from './add-gallary-routing.module';

import { AddGallaryPage } from './add-gallary.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddGallaryPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddGallaryPage]
})
export class AddGallaryPageModule {}
