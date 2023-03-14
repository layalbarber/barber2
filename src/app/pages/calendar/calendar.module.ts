import { CalendarModule } from "ion2-calendar";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CalendarPageRoutingModule } from "./calendar-routing.module";

import { CalendarPage } from "./calendar.page";
import { NgCalendarModule } from "ionic2-calendar";
import { NgxProgressiveImgLoaderModule } from "ngx-progressive-img-loader";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    CalendarModule,
    CalendarPageRoutingModule,
    NgxProgressiveImgLoaderModule,
    TranslateModule,
  ],
  declarations: [CalendarPage],
})
export class CalendarPageModule {}
