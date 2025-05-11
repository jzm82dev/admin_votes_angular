import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './meeting.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { ListMeetingComponent } from './list-meeting/list-meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { AssistantsComponent } from './assistants/assistants.component';

const routes: Routes = [
  { 
    path: '', 
    component: MeetingComponent,
    children: [
      {
        path: 'add',
        component: AddMeetingComponent
      },
      {
        path: 'list',
        component: ListMeetingComponent
      },
      {
        path: 'edit/:id',
        component: EditMeetingComponent
      },
      {
        path: 'assistants/:meeting_id/:urbanisation_id',
        component: AssistantsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
