import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from 'src/app/core/email/email.component';
import { NewEmailComponent } from './new-email/new-email.component';
import { PotentialClubComponent } from './potential-club/potential-club.component';
import { ListPotentialClubComponent } from './list-potential-club/list-potential-club.component';
import { EditPotentialClubComponent } from './edit-potential-club/edit-potential-club.component';

const routes: Routes = [
  { 
    path: '', 
    component: EmailComponent,
    children: [
    {
      path: 'new',
      component: NewEmailComponent
    },
    {
      path: 'potential-club',
      component: PotentialClubComponent
    },
    {
      path: 'list',
      component: ListPotentialClubComponent
    },
    {
      path: 'list/edit/:id',
      component: EditPotentialClubComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
