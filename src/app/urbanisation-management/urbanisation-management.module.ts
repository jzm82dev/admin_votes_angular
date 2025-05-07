import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrbanisationManagementRoutingModule } from './urbanisation-management-routing.module';
import { UrbanisationManagementComponent } from './urbanisation-management.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UrbanisationManagementComponent
  ],
  imports: [
    CommonModule,
    UrbanisationManagementRoutingModule,
    SharedModule
  ]
})
export class UrbanisationManagementModule { }
