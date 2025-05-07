import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueResultRoutingModule } from './league-result-routing.module';
import { LeagueResultComponent } from './league-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LeagueResultComponent
  ],
  imports: [
    CommonModule,
    LeagueResultRoutingModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class LeagueResultModule { }
