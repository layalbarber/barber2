import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmployeesPage } from './add-employees.page';

const routes: Routes = [
  {
    path: '',
    component: AddEmployeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEmployeesPageRoutingModule {}
