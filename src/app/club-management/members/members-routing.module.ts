import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';

const routes: Routes = [
  { 
    path: '', 
    component: MembersComponent,
    children: [
    {
      path: 'add-member',
      component: AddMemberComponent
    },
    {
      path: 'list-member',
      component: ListMemberComponent
    },
    {
      path: 'list-member/edit/:id',
      component: EditMemberComponent
    },
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
