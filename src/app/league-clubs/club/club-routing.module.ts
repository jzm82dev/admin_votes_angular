import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club.component';
import { AddClubComponent } from './add-club/add-club.component';
import { ListClubComponent } from './list-club/list-club.component';
import { EditClubComponent } from './edit-club/edit-club.component';

const routes: Routes = [
  { 
    path: '', 
    component: ClubComponent,
    children: [
    {
      path: 'add-club',
      component: AddClubComponent
    },
    {
      path: 'list-club',
      component: ListClubComponent
    },
    {
      path: 'list-club/edit/:id',
      component: EditClubComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
