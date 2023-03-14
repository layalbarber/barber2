import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSalonPageRoutingModule } from './add-salon-routing.module';

import { AddSalonPage } from './add-salon.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSalonPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddSalonPage]
})
export class AddSalonPageModule {}
