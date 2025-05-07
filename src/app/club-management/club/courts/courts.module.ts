import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtsRoutingModule } from './courts-routing.module';
import { CourtsComponent } from './courts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCourtComponent } from './add-court/add-court.component';
import { EditCourtComponent } from './edit-court/edit-court.component';
import { ListCourtComponent } from './list-court/list-court.component';
import { ManagementCourtComponent } from './management-court/management-court.component';


@NgModule({
  declarations: [
    CourtsComponent,
    AddCourtComponent,
    EditCourtComponent,
    ListCourtComponent,
    ManagementCourtComponent
  ],
  imports: [
    CommonModule,
    CourtsRoutingModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class CourtsModule { }
