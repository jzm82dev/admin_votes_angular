import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTournamentsComponent } from './list-tournaments/list-tournaments.component';
import { ViewTournamentsComponent } from './view-tournaments/view-tournaments.component';
import { TournamentComponent } from './tournament.component';

const routes: Routes = [
  { 
    path: '', 
    component: TournamentComponent,
    children: [
      {
        path: 'all/:hash',
        component: ListTournamentsComponent
      },
      {
        path: 'view/:hash',
        component: ViewTournamentsComponent
      },
      {
        path: 'view/:id/:category_id/:type_draw',
        component: ViewTournamentsComponent
      },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
