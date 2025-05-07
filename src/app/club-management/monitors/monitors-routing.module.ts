import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorsComponent } from './monitors.component';
import { AddMonitorComponent } from './add-monitor/add-monitor.component';
import { ListMonitorComponent } from './list-monitor/list-monitor.component';
import { EditMonitorComponent } from './edit-monitor/edit-monitor.component';

const routes: Routes = [
  { 
    path: '', 
    component: MonitorsComponent,
    children: [
    {
      path: 'add-monitor',
      component: AddMonitorComponent
    },
    {
      path: 'list-monitor',
      component: ListMonitorComponent
    },
    {
      path: 'list-monitor/edit/:id',
      component: EditMonitorComponent
    },
   /* {
      path: 'list-appointments/management/:id',
      component: ManagementComponent
    } */
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorsRoutingModule { }
