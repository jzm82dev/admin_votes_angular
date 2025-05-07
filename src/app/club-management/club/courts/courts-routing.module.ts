import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourtsComponent } from './courts.component';
import { AddCourtComponent } from './add-court/add-court.component';
import { ListCourtComponent } from './list-court/list-court.component';
import { EditCourtComponent } from './edit-court/edit-court.component';
import { ManagementCourtComponent } from './management-court/management-court.component';

const routes: Routes = [
  { 
    path: '', 
    component: CourtsComponent,
    children: [
      {
        path: '',
        component: ListCourtComponent
      },
      {
        path: 'add-court',
        component: AddCourtComponent
      },
      {
        path: 'edit/:id',
        component: EditCourtComponent
      },
      {
        path: 'list-courts/management/:id',
        component: ManagementCourtComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourtsRoutingModule { }
