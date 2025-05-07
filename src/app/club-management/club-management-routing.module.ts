import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubManagementComponent } from './club-management.component';
import { AuthGuard } from '../shared/gaurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClubManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'club/data',
        loadChildren: () =>
          import('./club/club.module').then((m) => m.ClubModule),
      },
      {
        path: 'club/description',
        loadChildren: () =>
          import('./club/description/description.module').then((m) => m.DescriptionModule),
      },
      {
        path: 'club/schedule',
        loadChildren: () =>
          import('./club/schedule/schedule.module').then((m) => m.ScheduleModule),
      },
      {
        path: 'club/courts',
        loadChildren: () =>
          import('./club/courts/courts.module').then((m) => m.CourtsModule),
      },
      {
        path: 'club/services',
        loadChildren: () =>
          import('./club/services/services.module').then((m) => m.ServicesModule),
      },
      {
        path: 'club/social-links',
        loadChildren: () =>
          import('./club/social-links/social-links.module').then((m) => m.SocialLinksModule),
      },
      {
        path: 'club/member-profile/:user_id/:club_user_id',
        loadChildren: () =>
          import('./club/member-profile/member-profile.module').then((m) => m.MemberProfileModule),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('./reservations/reservations.module').then((m) => m.ReservationsModule),
      },
      {
        path: 'monitors',
        loadChildren: () =>
          import('./monitors/monitors.module').then((m) => m.MonitorsModule),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./members/members.module').then((m) => m.MembersModule),
      },
      {
        path: 'recurrents',
        loadChildren: () =>
          import('./recurrent/recurrent.module').then((m) => m.RecurrentModule),
      },
      {
        path: 'lessons',
        loadChildren: () =>
          import('./lessons/lessons.module').then((m) => m.LessonsModule),
      },
      {
        path: 'tournament/data',
        loadChildren: () =>
          import('./tournament/tournament.module').then((m) => m.TournamentModule),
      },
      {
        path: 'tournament/data/:id',
        loadChildren: () =>
          import('./tournament/tournament.module').then((m) => m.TournamentModule),
      },
      {
        path: 'tournament/data/:id/:tab',
        loadChildren: () =>
          import('./tournament/tournament.module').then((m) => m.TournamentModule),
      },
      {
        path: 'subscriptions/get-subscription',
        loadChildren: () =>
          import('./subscriptions/subscriptions.module').then((m) => m.SubscriptionsModule),
      },
      {
        path: 'payments/get-payments',
        loadChildren: () =>
          import('./payments/payments.module').then((m) => m.PaymentsModule),
      },
      {
        path: 'payments/view-payments/:id',
        loadChildren: () =>
          import('./payments/invoice-view/invoice-view.module').then((m) => m.InvoiceViewModule),
      },
      {
        path: 'wallet',
        loadChildren: () =>
          import('./virtual-wallet/virtual-wallet.module').then((m) => m.VirtualWalletModule),
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubManagementRoutingModule { }
