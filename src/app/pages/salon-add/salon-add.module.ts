import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonAddPageRoutingModule } from './salon-add-routing.module';

import { SalonAddPage } from './salon-add.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalonAddPageRoutingModule,
    TranslateModule
  ],
  declarations: [SalonAddPage]
})
export class SalonAddPageModule {}
