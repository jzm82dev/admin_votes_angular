import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { ListOwnerComponent } from './list-owner/list-owner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OwnerComponent,
    AddOwnerComponent,
    EditOwnerComponent,
    ListOwnerComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class OwnerModule { }
