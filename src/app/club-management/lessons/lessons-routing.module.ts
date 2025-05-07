import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonsComponent } from './lessons.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { ListLessonComponent } from './list-lesson/list-lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';

const routes: Routes = [
  { 
    path: '', 
    component: LessonsComponent,
    children: [
    {
      path: 'book-lesson',
      component: AddLessonComponent
    },
    {
      path: 'list',
      component: ListLessonComponent
    },
    {
      path: 'list/edit/:id',
      component: EditLessonComponent
    },
    {
      path: 'list/view/:id',
      component: ViewLessonComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
