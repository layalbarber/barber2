import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSalonPage } from './add-salon.page';

const routes: Routes = [
  {
    path: '',
    component: AddSalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSalonPageRoutingModule {}
