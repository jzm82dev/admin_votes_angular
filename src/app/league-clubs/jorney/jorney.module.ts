import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JorneyRoutingModule } from './jorney-routing.module';
import { JorneyComponent } from './jorney.component';
import { AddJorneyComponent } from './add-jorney/add-jorney.component';
import { EditJorneyComponent } from './edit-jorney/edit-jorney.component';
import { ListJorneyComponent } from './list-jorney/list-jorney.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JorneyComponent,
    AddJorneyComponent,
    EditJorneyComponent,
    ListJorneyComponent
  ],
  imports: [
    CommonModule,
    JorneyRoutingModule,
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class JorneyModule { }
