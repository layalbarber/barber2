import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmployeesPageRoutingModule } from './add-employees-routing.module';

import { AddEmployeesPage } from './add-employees.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEmployeesPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddEmployeesPage]
})
export class AddEmployeesPageModule {}
