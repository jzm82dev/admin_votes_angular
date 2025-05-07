import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubManagementRoutingModule } from './club-management-routing.module';
import { ClubManagementComponent } from './club-management.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClubManagementComponent
  ],
  imports: [
    CommonModule,
    ClubManagementRoutingModule,
    SharedModule
  ]
})
export class ClubManagementModule { }
