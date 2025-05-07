import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorsRoutingModule } from './monitors-routing.module';
import { MonitorsComponent } from './monitors.component';
import { AddMonitorComponent } from './add-monitor/add-monitor.component';
import { EditMonitorComponent } from './edit-monitor/edit-monitor.component';
import { ListMonitorComponent } from './list-monitor/list-monitor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MonitorsComponent,
    AddMonitorComponent,
    EditMonitorComponent,
    ListMonitorComponent
  ],
  imports: [
    CommonModule,
    MonitorsRoutingModule,
    //forms
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class MonitorsModule { }
