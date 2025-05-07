import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { EditAppointmentsComponent } from './edit-appointments/edit-appointments.component';
import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  { 
    path: '', 
    component: AppointmentComponent,
    children: [
    {
      path: 'add-appointment',
      component: AddAppointmentsComponent
    },
    {
      path: 'list-appointments',
      component: ListAppointmentsComponent
    },
    {
      path: 'list-appointments/edit/:id',
      component: EditAppointmentsComponent
    },
    {
      path: 'list-appointments/management/:id',
      component: ManagementComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
