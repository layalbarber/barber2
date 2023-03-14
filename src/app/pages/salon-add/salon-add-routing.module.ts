import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonAddPage } from './salon-add.page';

const routes: Routes = [
  {
    path: '',
    component: SalonAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonAddPageRoutingModule {}
