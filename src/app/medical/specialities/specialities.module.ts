import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialitiesRoutingModule } from './specialities-routing.module';
import { SpecialitiesComponent } from './specialities.component';
import { AddSpecialityComponent } from './add-speciality/add-speciality.component';
import { EditSpecialityComponent } from './edit-speciality/edit-speciality.component';
import { ListSpecialityComponent } from './list-speciality/list-speciality.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SpecialitiesComponent,
    AddSpecialityComponent,
    EditSpecialityComponent,
    ListSpecialityComponent
  ],
  imports: [
    CommonModule,
    SpecialitiesRoutingModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SpecialitiesModule { }
