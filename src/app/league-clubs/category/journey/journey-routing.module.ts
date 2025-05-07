import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyComponent } from './journey.component';
import { JorneyComponent } from '../../jorney/jorney.component';
import { EditJourneyComponent } from './edit-journey/edit-journey.component';
import { ListJourneyComponent } from './list-journey/list-journey.component';
import { EditResultComponent } from '../draw/edit-result/edit-result.component';


const routes: Routes = [
  { 
    path: '', 
    component: JorneyComponent,
    children: [
      {
        path: '',
        component: ListJourneyComponent
      },
      {
        path: 'edit/:category_id/:journey_id',
        component: EditJourneyComponent
      },
      {
        path: 'edit-result/:category_id/:match_id',
        component: EditResultComponent
      }
    ]
  }
];


//const routes: Routes = [{ path: '', component: JourneyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyRoutingModule { }
