import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from 'src/app/core/staff/staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';

const routes: Routes = [
  { 
    path: '', 
    component: StaffComponent,
    children: [
    {
      path: 'add-staff',
      component: AddStaffComponent
    },
    {
      path: 'list-staff',
      component: ListStaffComponent
    },
    {
      path: 'list-staff/edit-staff/:id',
      component: EditStaffComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
