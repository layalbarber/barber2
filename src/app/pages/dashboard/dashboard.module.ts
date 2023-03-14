import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { CustomPipeModule } from 'src/app/modules/custom-pipe.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomPipeModule,
    DashboardPageRoutingModule,
    TranslateModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
