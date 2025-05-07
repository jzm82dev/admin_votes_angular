import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawComponent } from './draw.component';
import { EditResultComponent } from './edit-result/edit-result.component';
import { ViewDrawComponent } from './view-draw/view-draw.component';
import { MatchsComponent } from './matchs/matchs.component';
import { ViewBackDrawComponent } from './view-back-draw/view-back-draw.component';
import { ViewSimpleLeagueComponent } from './view-simple-league/view-simple-league.component';
import { ViewClasificationComponent } from './view-clasification/view-clasification.component';
import { AllMatchesComponent } from 'src/app/club-management/tournament/all-matches/all-matches.component';
import { PlayersComponent } from 'src/app/club-management/tournament/players/players.component';

const routes: Routes = [
  { 
    path: '', 
    component: DrawComponent,
    children: [
      {
        path: 'main/:id',
        component: ViewDrawComponent
      },
      {
        path: 'back/:id',
        component: ViewBackDrawComponent
      },
      {
        path: 'edit-result/:match_id',
        component: EditResultComponent
      },
      {
        path: 'matchs/:id',
        component: MatchsComponent
      },
      {
        path: 'simple-league/:id',
        component: ViewSimpleLeagueComponent
      },
      {
        path: 'simple-league/:id/:couple_id',
        component: ViewSimpleLeagueComponent
      },
      {
        path: 'clasification/:id',
        component: ViewClasificationComponent
      },
      {
        path: 'all-matchs/:tournament_id',
        component: AllMatchesComponent
      },
      {
        path: 'all-players/:tournament_id',
        component: PlayersComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawRoutingModule { }
