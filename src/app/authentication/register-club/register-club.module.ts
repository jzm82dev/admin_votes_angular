import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterClubRoutingModule } from './register-club-routing.module';
import { RegisterClubComponent } from './register-club.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    RegisterClubComponent
  ],
  imports: [
    CommonModule,
    RegisterClubRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class RegisterClubModule { }
