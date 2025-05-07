import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherClubRoutingModule } from './other-club-routing.module';
import { OtherClubComponent } from './other-club.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OtherClubComponent
  ],
  imports: [
    CommonModule,
    OtherClubRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class OtherClubModule { }
