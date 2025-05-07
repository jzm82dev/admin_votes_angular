import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { ListTournamentComponent } from './list-tournament/list-tournament.component';

const routes: Routes = [
  { 
    path: '', 
    component: TournamentComponent,
    children: [
    {
      path: 'list-tournament',
      component: ListTournamentComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
