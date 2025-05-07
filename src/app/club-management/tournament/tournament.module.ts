import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { PlayersComponent } from './players/players.component';


@NgModule({
  declarations: [
    TournamentComponent,
    AllMatchesComponent,
    PlayersComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class TournamentModule { }
