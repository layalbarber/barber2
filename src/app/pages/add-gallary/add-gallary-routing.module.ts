import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGallaryPage } from './add-gallary.page';

const routes: Routes = [
  {
    path: '',
    component: AddGallaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGallaryPageRoutingModule {}
