import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JorneyComponent } from './jorney.component';
import { AddJorneyComponent } from './add-jorney/add-jorney.component';
import { ListJorneyComponent } from './list-jorney/list-jorney.component';
import { EditJorneyComponent } from './edit-jorney/edit-jorney.component';

const routes: Routes = [
  { 
    path: '', 
    component: JorneyComponent,
    children: [
    {
      path: 'add-jorney',
      component: AddJorneyComponent
    },
    {
      path: 'list-jorney',
      component: ListJorneyComponent
    },
    {
      path: 'list-jorney/edit/:id',
      component: EditJorneyComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JorneyRoutingModule { }
