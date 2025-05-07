import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueResultComponent } from './league-result.component';

const routes: Routes = [
  { 
    path: '', 
    component: LeagueResultComponent,
    children: [
    {
      path: 'motril',
      component: LeagueResultComponent
    },
    {
      path: 'category/:id',
      component: LeagueResultComponent
    },
   /* {
      path: 'list-staff',
      component: ListStaffComponent
    },
    {
      path: 'list-staff/edit-staff/:id',
      component: EditStaffComponent
    }*/
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueResultRoutingModule { }
