import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurrentRoutingModule } from './recurrent-routing.module';
import { RecurrentComponent } from './recurrent.component';
import { AddRecurrentComponent } from './add-recurrent/add-recurrent.component';
import { ListRecurrentComponent } from './list-recurrent/list-recurrent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditRecurrentComponent } from './edit-recurrent/edit-recurrent.component';
import { ViewRecurrentComponent } from './view-recurrent/view-recurrent.component';


@NgModule({
  declarations: [
    RecurrentComponent,
    AddRecurrentComponent,
    ListRecurrentComponent,
    EditRecurrentComponent,
    ViewRecurrentComponent
  ],
  imports: [
    CommonModule,
    RecurrentRoutingModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class RecurrentModule { }
