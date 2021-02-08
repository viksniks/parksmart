import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddparkingPageRoutingModule } from './addparking-routing.module';

import { AddparkingPage } from './addparking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddparkingPageRoutingModule
  ],
  declarations: [AddparkingPage]
})
export class AddparkingPageModule {}
