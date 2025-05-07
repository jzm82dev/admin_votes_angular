import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';


const routes: Routes = [
  { 
    path: '', 
    component: DoctorComponent,
    children: [
    {
      path: 'register',
      component: AddDoctorComponent
    },
    {
      path: 'list',
      component: ListDoctorComponent
    },
    {
      path: 'list/edit/:id',
      component: EditDoctorComponent
    },
    {
      path: 'list/profile/:id',
      component: DoctorProfileComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
