import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';

const routes: Routes = [
  { 
    path: '', 
    component: PatientComponent,
    children: [
    {
      path: 'register',
      component: AddPatientComponent
    },
    {
      path: 'list',
      component: ListPatientComponent
    },
    {
      path: 'list/edit/:id',
      component: EditPatientComponent
    },
    {
      path: 'list/profile/:id',
      component: PatientProfileComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
