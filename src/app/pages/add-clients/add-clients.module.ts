import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClientsPageRoutingModule } from './add-clients-routing.module';

import { AddClientsPage } from './add-clients.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddClientsPageRoutingModule,
    TranslateModule,
    NgSelectModule,
  ],
  declarations: [AddClientsPage]
})
export class AddClientsPageModule {}
