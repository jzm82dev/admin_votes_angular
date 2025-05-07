import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerManagementRoutingModule } from './player-management-routing.module';
import { PlayerManagementComponent } from './player-management.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlayerManagementComponent
  ],
  imports: [
    CommonModule,
    PlayerManagementRoutingModule,
    SharedModule
  ]
})
export class PlayerManagementModule { }
