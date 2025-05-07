import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurrentComponent } from './recurrent.component';
import { AddRecurrentComponent } from './add-recurrent/add-recurrent.component';
import { ListRecurrentComponent } from './list-recurrent/list-recurrent.component';
import { EditRecurrentComponent } from './edit-recurrent/edit-recurrent.component';
import { ViewRecurrentComponent } from './view-recurrent/view-recurrent.component';

const routes: Routes = [
  { 
    path: '', 
    component: RecurrentComponent,
    children: [
    {
      path: 'book-recurrent',
      component: AddRecurrentComponent
    },
    {
      path: 'list',
      component: ListRecurrentComponent
    },
    {
      path: 'list/edit/:id',
      component: EditRecurrentComponent
    },
    {
      path: 'list/view/:id',
      component: ViewRecurrentComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurrentRoutingModule { }
