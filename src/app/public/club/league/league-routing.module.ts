import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueComponent } from './league.component';
import { ViewLeagueComponent } from './view-league/view-league.component';
import { ListLeaguesComponent } from './list-leagues/list-leagues.component';



const routes: Routes = [
  { 
    path: '', 
    component: LeagueComponent,
    children: [
      {
        path: 'all/:hash',
        component: ListLeaguesComponent
      },
      {
        path: 'list/:hash',
        component: ListLeaguesComponent
      },
      {
        path: 'view/:id',
        component: ViewLeagueComponent
      },
   ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
