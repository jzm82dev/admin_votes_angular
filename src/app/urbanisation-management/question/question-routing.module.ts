import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { VotingQuestionComponent } from './voting-question/voting-question.component';
import { VotesResultComponent } from './votes-result/votes-result.component';
import { FinalReportComponent } from './final-report/final-report.component';

const routes: Routes = [
  { 
    path: '', 
    component: QuestionComponent,
    children: [
      {
        path: 'edit/:id',
        component: EditQuestionComponent
      },
      {
        path: 'vote/:id',
        component: VotingQuestionComponent
      },
      {
        path: 'result/:id',
        component: VotesResultComponent
      },
      {
        path: 'report/:meeting_id',
        component: FinalReportComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
