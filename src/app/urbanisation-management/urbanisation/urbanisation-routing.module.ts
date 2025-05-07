import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrbanisationComponent } from './urbanisation.component';
import { AddUrbanisationComponent } from './add-urbanisation/add-urbanisation.component';
import { ListUrbanisationComponent } from './list-urbanisation/list-urbanisation.component';
import { EditUrbanisationComponent } from './edit-urbanisation/edit-urbanisation.component';

const routes: Routes = [
  { 
    path: '', 
    component: UrbanisationComponent,
    children: [
      {
        path: 'add',
        component: AddUrbanisationComponent
      },
      {
        path: 'list',
        component: ListUrbanisationComponent
      },
      {
        path: 'list/edit/:id',
        component: EditUrbanisationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrbanisationRoutingModule { }
