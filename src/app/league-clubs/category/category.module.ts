import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import { FilterPipe } from '../pipe/filter.pipe';


@NgModule({
  declarations: [
    CategoryComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
     //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class CategoryModule { }
