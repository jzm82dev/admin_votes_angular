import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';


@NgModule({
  declarations: [
    PatientComponent,
    AddPatientComponent,
    EditPatientComponent,
    ListPatientComponent,
    PatientProfileComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
     //forms
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     RouterModule,
     SharedModule
  ]
})
export class PatientModule { }
