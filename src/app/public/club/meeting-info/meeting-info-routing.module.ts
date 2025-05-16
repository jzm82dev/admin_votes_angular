import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingInfoComponent } from './meeting-info.component';

const routes: Routes = [
  { 
    path: '', 
    component: MeetingInfoComponent,
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingInfoRoutingModule { }
