import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddparkingPage } from './addparking.page';

const routes: Routes = [
  {
    path: '',
    component: AddparkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddparkingPageRoutingModule {}
