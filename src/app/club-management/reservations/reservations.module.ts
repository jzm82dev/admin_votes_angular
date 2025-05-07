import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationComponent } from './new/reservation.component';


@NgModule({
  declarations: [
    ReservationsComponent,
    CalendarComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
     //form
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     RouterModule,
     SharedModule
  ]
})
export class ReservationsModule { }
