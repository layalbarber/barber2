import { CustomPipeModule } from "./../../modules/custom-pipe.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SelectServicesPageRoutingModule } from "./select-services-routing.module";

import { SelectServicesPage } from "./select-services.page";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomPipeModule,
    SelectServicesPageRoutingModule,
    TranslateModule
  ],
  declarations: [SelectServicesPage],
})
export class SelectServicesPageModule {}
