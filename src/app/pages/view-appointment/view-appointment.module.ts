import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAppointmentPageRoutingModule } from './view-appointment-routing.module';

import { ViewAppointmentPage } from './view-appointment.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ViewAppointmentPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewAppointmentPage]
})
export class ViewAppointmentPageModule {}
