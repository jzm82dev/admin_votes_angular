import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league.component';
import { AddLeagueComponent } from './add-league/add-league.component';
import { ListLeagueComponent } from './list-league/list-league.component';
import { EditLeagueComponent } from './edit-league/edit-league.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  { 
    path: '', 
    component: LeagueComponent,
    children: [
    {
      path: 'add-league',
      component: AddLeagueComponent
    },
    {
      path: 'list-league',
      component: ListLeagueComponent
    },
    {
      path: 'list-league/edit/:id',
      component: EditLeagueComponent
    },
    {
      path: 'list-league/edit/:id/:tab',
      component: EditLeagueComponent
    },
    {
      path: 'all-players/:id',
      component: PlayersComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
