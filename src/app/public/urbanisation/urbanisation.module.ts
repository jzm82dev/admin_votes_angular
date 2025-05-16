import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrbanisationRoutingModule } from './urbanisation-routing.module';
import { UrbanisationComponent } from './urbanisation.component';


@NgModule({
  declarations: [
    UrbanisationComponent
  ],
  imports: [
    CommonModule,
    UrbanisationRoutingModule
  ]
})
export class UrbanisationModule { }
