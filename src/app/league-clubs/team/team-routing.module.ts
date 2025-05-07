import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ListTeamComponent } from './list-team/list-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

const routes: Routes = [
  { 
    path: '', 
    component: TeamComponent,
    children: [
    {
      path: 'add-team',
      component: AddTeamComponent
    },
    {
      path: 'list-team',
      component: ListTeamComponent
    },
    {
      path: 'list-team/edit/:id',
      component: EditTeamComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
