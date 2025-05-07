import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './shared/gaurd/auth.guard';

const routes: Routes = [
  /*{
    path: '',
    pathMatch: 'full',
    redirectTo: 'motril',
  },*/

  {
    path: '',
    loadChildren: () => import('./public/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'en',
    loadChildren: () => import('./public/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: '',
    loadChildren: () => import('./medical/medical.module').then((m) => m.MedicalModule),
  },
 
  {
    path: '',
    loadChildren: () => import('./tournament-clubs/tournament-clubs.module').then((m) => m.TournamentClubsModule),
  },

  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '',
    loadChildren: () => import('./urbanisation-management/urbanisation-management.module').then((m) => m.UrbanisationManagementModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },

  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    redirectTo: 'error/error404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
