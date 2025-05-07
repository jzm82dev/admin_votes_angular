import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalComponent } from './medical.component';
import { AuthGuard } from '../shared/gaurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MedicalComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'roles2',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'staffs2',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffModule),
      },
      {
        path: 'specialities',
        loadChildren: () =>
          import('./specialities/specialities.module').then((m) => m.SpecialitiesModule),
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./doctor/doctor.module').then((m) => m.DoctorModule),
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./appointment/appointment.module').then((m) => m.AppointmentModule),
      },
      {
        path: 'appointments-pay',
        loadChildren: () =>
          import('./appointment-pay/appointment-pay.module').then((m) => m.AppointmentPayModule),
      },
      {
        path: 'calendar-appoinment',
        loadChildren: () =>
          import('./calendar-appointment/calendar-appointment.module').then((m) => m.CalendarAppointmentModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
