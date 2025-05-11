import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { ListMeetingComponent } from './list-meeting/list-meeting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssistantsComponent } from './assistants/assistants.component';


@NgModule({
  declarations: [
    MeetingComponent,
    AddMeetingComponent,
    EditMeetingComponent,
    ListMeetingComponent,
    AssistantsComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class MeetingModule { }
