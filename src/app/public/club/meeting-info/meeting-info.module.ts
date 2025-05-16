import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingInfoRoutingModule } from './meeting-info-routing.module';
import { MeetingInfoComponent } from './meeting-info.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MeetingInfoComponent
  ],
  imports: [
    CommonModule,
    MeetingInfoRoutingModule,
    SharedModule
  ]
})
export class MeetingInfoModule { }
