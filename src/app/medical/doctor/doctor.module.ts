import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { TimeAgoPipe } from '../pipe/time-ago.pipe';


@NgModule({
  declarations: [
    DoctorComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    ListDoctorComponent,
    DoctorProfileComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    //forms
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
})
export class DoctorModule { }
