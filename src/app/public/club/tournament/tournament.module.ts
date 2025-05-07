import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { ListTournamentsComponent } from './list-tournaments/list-tournaments.component';
import { ViewTournamentsComponent } from './view-tournaments/view-tournaments.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TournamentComponent,
    ListTournamentsComponent,
    ViewTournamentsComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    SharedModule
  ]
})
export class TournamentModule { }
