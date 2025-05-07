import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouplesRoutingModule } from './couples-routing.module';
import { CouplesComponent } from './couples.component';


@NgModule({
  declarations: [
    CouplesComponent
  ],
  imports: [
    CommonModule,
    CouplesRoutingModule
  ]
})
export class CouplesModule { }
