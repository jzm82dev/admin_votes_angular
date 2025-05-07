import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueClubsComponent } from './league-clubs.component';
import { AuthGuard } from '../shared/gaurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LeagueClubsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clubs',
        loadChildren: () =>
          import('./club/club.module').then((m) => m.ClubModule),
      },
      {
        path: 'players',
        loadChildren: () =>
          import('./player/player.module').then((m) => m.PlayerModule),
      },
      {
        path: 'leagues',
        loadChildren: () =>
          import('./league/league.module').then((m) => m.LeagueModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('./team/team.module').then((m) => m.TeamModule),
      },
      {
        path: 'jorneys',
        loadChildren: () =>
          import('./jorney/jorney.module').then((m) => m.JorneyModule),
      },
      {
        path: 'category/data/:id/:tab',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },

      {
        path: 'category/journeys/:id',
        loadChildren: () =>
          import('./category/journey/journey.module').then((m) => m.JourneyModule),
      },
      {
        path: 'category/ranking/:id',
        loadChildren: () =>
          import('./category/ranking/ranking.module').then((m) => m.RankingModule),
      },
      {
        path: 'category/draw',
        loadChildren: () =>
          import('./category/draw/draw.module').then((m) => m.DrawModule),
      },
      {
        path: 'category/draw',
        loadChildren: () =>
          import('./category/draw/draw.module').then((m) => m.DrawModule),
      },
      {
        path: 'category/view-back-draw/:id',
        loadChildren: () =>
          import('./category/draw/draw.module').then((m) => m.DrawModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueClubsRoutingModule { }
