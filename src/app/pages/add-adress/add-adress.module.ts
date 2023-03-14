import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddAdressPageRoutingModule } from './add-adress-routing.module';
import { AddAdressPage } from './add-adress.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdressPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddAdressPage]
})
export class AddAdressPageModule {}
