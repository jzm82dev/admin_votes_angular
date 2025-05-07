import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentClubsRoutingModule } from './tournament-clubs-routing.module';
import { TournamentClubsComponent } from './tournament-clubs.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TournamentClubsComponent
  ],
  imports: [
    CommonModule,
    TournamentClubsRoutingModule,
    SharedModule
  ]
})
export class TournamentClubsModule { }
