import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanySettingPageRoutingModule } from './company-setting-routing.module';

import { CompanySettingPage } from './company-setting.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompanySettingPageRoutingModule,
    TranslateModule
  ],
  declarations: [CompanySettingPage]
})
export class CompanySettingPageModule {}
