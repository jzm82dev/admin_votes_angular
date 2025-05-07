import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddLeagueComponent } from './add-league/add-league.component';
import { EditLeagueComponent } from './edit-league/edit-league.component';
import { ListLeagueComponent } from './list-league/list-league.component';
import { PlayersComponent } from './players/players.component';


@NgModule({
  declarations: [
    LeagueComponent,
    AddLeagueComponent,
    EditLeagueComponent,
    ListLeagueComponent,
    PlayersComponent
  ],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    //
     //
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     RouterModule,
     SharedModule
  ]
})
export class LeagueModule { }
