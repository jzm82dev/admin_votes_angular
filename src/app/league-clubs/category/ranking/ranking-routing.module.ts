import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './ranking.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: RankingComponent 
  },
  {
    path: 'view/:couple_id',
    component: DetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingRoutingModule { }
