import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrbanisationComponent } from './urbanisation.component';

const routes: Routes = [
  { 
    path: '', 
    component: UrbanisationComponent,
   /* children: [
    {
      path: 'home',
      component: HomeComponent
    },
   
  ]*/}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrbanisationRoutingModule { }
