import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { ReservationsComponent } from './reservations.component';
import { ReservationComponent } from './new/reservation.component';

const routes: Routes = [
  { 
    path: '', 
    component: ReservationsComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'new/:date',
        component: ReservationComponent
      },
      {
        path: 'new',
        component: ReservationComponent
      },
      {
        path: 'new/:date/:sport_id',
        component: ReservationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
