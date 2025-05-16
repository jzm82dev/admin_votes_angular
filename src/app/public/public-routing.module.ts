import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { 
    path: '', 
    component: PublicComponent,
    children: [
      {
        path: 'motril/category/:id',
        component: DetailsComponent
      },
      {
        path: 'motril',
        loadChildren: () =>
          import('./league-result/league-result.module').then((m) => m.LeagueResultModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'club/leagues',
        loadChildren: () =>
          import('./club/league/league.module').then((m) => m.LeagueModule),
      },
      {
        path: 'club/tournaments',
        loadChildren: () =>
          import('./club/tournament/tournament.module').then((m) => m.TournamentModule),
      },
      {
        path: 'club/:hash',
        loadChildren: () =>
          import('./club/club.module').then((m) => m.ClubModule),
      },
      {
        path: 'public/urbanisation/:hash',
        loadChildren: () =>
          import('./club/club.module').then((m) => m.ClubModule),
      },
       {
        path: 'urbanisation/meeting-info/:id',
        loadChildren: () =>
          import('./club/meeting-info/meeting-info.module').then((m) => m.MeetingInfoModule),
      },
      {
        path: 'club/:hash/:tab',
        loadChildren: () =>
          import('./club/club.module').then((m) => m.ClubModule),
      },
      {
        path: 'club/booking/:sport/:hash/:date',
        loadChildren: () =>
          import('./club/booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'club/booking/:sport/:hash',
        loadChildren: () =>
          import('./club/booking/booking.module').then((m) => m.BookingModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
