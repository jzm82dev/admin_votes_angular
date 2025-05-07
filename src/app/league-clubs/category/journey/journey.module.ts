import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneyRoutingModule } from './journey-routing.module';
import { JourneyComponent } from './journey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListJourneyComponent } from './list-journey/list-journey.component';
import { EditJourneyComponent } from './edit-journey/edit-journey.component';


@NgModule({
  declarations: [
    JourneyComponent,
    ListJourneyComponent,
    EditJourneyComponent
  ],
  imports: [
    CommonModule,
    JourneyRoutingModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class JourneyModule { }
