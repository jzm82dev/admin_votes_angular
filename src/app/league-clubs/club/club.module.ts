import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubComponent } from './club.component';
import { AddClubComponent } from './add-club/add-club.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { ListClubComponent } from './list-club/list-club.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClubComponent,
    AddClubComponent,
    EditClubComponent,
    ListClubComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule,
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class ClubModule { }
