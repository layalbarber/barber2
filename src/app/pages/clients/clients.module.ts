import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxProgressiveImgLoaderModule } from "ngx-progressive-img-loader";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NgxProgressiveImgLoaderModule,
    ClientsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {}
