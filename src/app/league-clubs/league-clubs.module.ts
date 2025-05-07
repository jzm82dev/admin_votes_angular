import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueClubsRoutingModule } from './league-clubs-routing.module';
import { LeagueClubsComponent } from './league-clubs.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LeagueClubsComponent
  ],
  imports: [
    CommonModule,
    LeagueClubsRoutingModule,
    SharedModule
  ]
})
export class LeagueClubsModule { }
