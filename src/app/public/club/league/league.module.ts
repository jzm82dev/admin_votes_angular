import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { ListLeaguesComponent } from './list-leagues/list-leagues.component';
import { ViewLeagueComponent } from './view-league/view-league.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LeagueComponent,
    ListLeaguesComponent,
    ViewLeagueComponent,
  ],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    SharedModule
  ]
})
export class LeagueModule { }
