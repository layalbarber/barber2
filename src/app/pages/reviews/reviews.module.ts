import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReviewsPageRoutingModule } from "./reviews-routing.module";

import { ReviewsPage } from "./reviews.page";
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsPageRoutingModule,
    TranslateModule,
    NgPipesModule
  ],
  declarations: [ReviewsPage],
})
export class ReviewsPageModule { }
