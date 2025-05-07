import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrbanisationRoutingModule } from './urbanisation-routing.module';
import { AddUrbanisationComponent } from './add-urbanisation/add-urbanisation.component';
import { EditUrbanisationComponent } from './edit-urbanisation/edit-urbanisation.component';
import { ListUrbanisationComponent } from './list-urbanisation/list-urbanisation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UrbanisationComponent } from './urbanisation.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddUrbanisationComponent,
    EditUrbanisationComponent,
    ListUrbanisationComponent,
    UrbanisationComponent
  ],
  imports: [
    CommonModule,
    UrbanisationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class UrbanisationModule { }
