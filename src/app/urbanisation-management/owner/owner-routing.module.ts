import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { ListOwnerComponent } from './list-owner/list-owner.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';


const routes: Routes = [
  { 
    path: '', 
    component: OwnerComponent,
    children: [
    
      {
        path: 'list/:urbanisation_id',
        component: ListOwnerComponent
      },
      {
        path: 'edit/:id/:urbanisation_id',
        component: EditOwnerComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
