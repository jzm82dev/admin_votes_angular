import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { ListTournamentComponent } from './list-tournament/list-tournament.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
//import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TournamentComponent,
    ListTournamentComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
   // SharedModule
  ]
})
export class TournamentModule { }
