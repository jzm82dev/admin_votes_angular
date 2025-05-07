import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical-routing.module';
import { MedicalComponent } from './medical.component';
import { SharedModule } from '../shared/shared.module';
//import { TimeAgoPipe } from './pipe/time-ago.pipe';


@NgModule({
  declarations: [
    MedicalComponent,
    //TimeAgoPipe
  ],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    SharedModule
  ]
})
export class MedicalModule { }
