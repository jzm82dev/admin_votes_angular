import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescriptionRoutingModule } from './description-routing.module';
import { DescriptionComponent } from './description.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DescriptionComponent
  ],
  imports: [
    CommonModule,
    DescriptionRoutingModule,
     //form
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     RouterModule,
     SharedModule
  ]
})
export class DescriptionModule { }
