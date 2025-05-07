import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialitiesComponent } from './specialities.component';
import { AddSpecialityComponent } from './add-speciality/add-speciality.component';
import { ListSpecialityComponent } from './list-speciality/list-speciality.component';
import { EditSpecialityComponent } from './edit-speciality/edit-speciality.component';

const routes: Routes = [
  { 
    path: '', 
    component: SpecialitiesComponent,
    children: [
    {
      path: 'add-speciality',
      component: AddSpecialityComponent
    },
    {
      path: 'list-speciality',
      component: ListSpecialityComponent
    },
    {
      path: 'list-speciality/edit-speciality/:id',
      component: EditSpecialityComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialitiesRoutingModule { }
