import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentClubsComponent } from './tournament-clubs.component';
import { AuthGuard } from '../shared/gaurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TournamentClubsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tournaments',
        loadChildren: () =>
          import('./tournament/tournament.module').then((m) => m.TournamentModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentClubsRoutingModule { }
