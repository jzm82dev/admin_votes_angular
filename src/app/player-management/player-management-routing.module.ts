import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerManagementComponent } from './player-management.component';
import { AuthGuard } from '../shared/gaurd/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: PlayerManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'player/data',
        loadChildren: () =>
          import('./player/player.module').then((m) => m.PlayerModule),
      },
      {
        path: 'player/clubs',
        loadChildren: () =>
          import('./club/club.module').then((m) => m.ClubModule),
      },
      {
        path: 'player/other-clubs',
        loadChildren: () =>
          import('./other-club/other-club.module').then((m) => m.OtherClubModule),
      },
      {
        path: 'player/match',
        loadChildren: () =>
          import('./match/match.module').then((m) => m.MatchModule),
      },
      {
        path: 'player/wallet',
        loadChildren: () =>
          import('./wallet/wallet.module').then((m) => m.WalletModule),
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerManagementRoutingModule { }
