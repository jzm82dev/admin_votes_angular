import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CategoryModule } from './category.module';


/*
const routes: Routes = [
  { 
    path: '', 
    component: CategoryComponent,
    children: [
    {
      path: 'add-category',
      component: AddCategoryComponent
    },
    {
      path: 'list-category',
      component: ListCategoryComponent
    },
    {
      path: 'list-category/edit/:id',
      component: EditCategoryComponent
    }
  ]}
];
*/

const routes: Routes = [{ path: '', component: CategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
