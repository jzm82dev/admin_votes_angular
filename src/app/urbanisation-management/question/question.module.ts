import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { VotingQuestionComponent } from './voting-question/voting-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { VotesResultComponent } from './votes-result/votes-result.component';
import { FinalReportComponent } from './final-report/final-report.component';


@NgModule({
  declarations: [
    QuestionComponent,
    EditQuestionComponent,
    VotingQuestionComponent,
    VotesResultComponent,
    FinalReportComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class QuestionModule { }
