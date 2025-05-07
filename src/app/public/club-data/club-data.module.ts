import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubDataRoutingModule } from './club-data-routing.module';
import { ClubDataComponent } from './club-data.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClubDataComponent
  ],
  imports: [
    CommonModule,
    ClubDataRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClubDataModule { }
