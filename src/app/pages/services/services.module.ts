import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomPipeModule } from './../../modules/custom-pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomPipeModule,
    Ng2SearchPipeModule,
    ServicesPageRoutingModule,
    TranslateModule
  ],
  declarations: [ServicesPage]
})
export class ServicesPageModule {}
