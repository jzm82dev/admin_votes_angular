import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrbanisationManagementComponent } from './urbanisation-management.component';
import { AuthGuard } from '../shared/gaurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UrbanisationManagementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'urbanisation',
        loadChildren: () =>
          import('./urbanisation/urbanisation.module').then((m) => m.UrbanisationModule),
      },
      {
        path: 'owner',
        loadChildren: () =>
          import('./owner/owner.module').then((m) => m.OwnerModule),
      },
      {
        path: 'meeting',
        loadChildren: () =>
          import('./meeting/meeting.module').then((m) => m.MeetingModule),
      },
      {
        path: 'question',
        loadChildren: () =>
          import('./question/question.module').then((m) => m.QuestionModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrbanisationManagementRoutingModule { }
