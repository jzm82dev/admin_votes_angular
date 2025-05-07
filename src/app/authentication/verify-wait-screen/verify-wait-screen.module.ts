import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyWaitScreenRoutingModule } from './verify-wait-screen-routing.module';
import { VerifyWaitScreenComponent } from './verify-wait-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    VerifyWaitScreenComponent
  ],
  imports: [
    CommonModule,
    VerifyWaitScreenRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class VerifyWaitScreenModule { }
