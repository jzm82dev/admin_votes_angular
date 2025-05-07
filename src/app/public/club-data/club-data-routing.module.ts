import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDataComponent } from './club-data.component';

const routes: Routes = [
  { 
    path: '', 
    component: ClubDataComponent,
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
export class ClubDataRoutingModule { }
