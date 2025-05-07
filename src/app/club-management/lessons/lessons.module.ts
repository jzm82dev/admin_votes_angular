import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './lessons.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { ListLessonComponent } from './list-lesson/list-lesson.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';


@NgModule({
  declarations: [
    LessonsComponent,
    AddLessonComponent,
    EditLessonComponent,
    ListLessonComponent,
    ViewLessonComponent
  ],
  imports: [
    CommonModule,
    LessonsRoutingModule
  ]
})
export class LessonsModule { }
