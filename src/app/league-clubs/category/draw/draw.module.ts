import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawRoutingModule } from './draw-routing.module';
import { DrawComponent } from './draw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditResultComponent } from './edit-result/edit-result.component';
import { ViewDrawComponent } from './view-draw/view-draw.component';
import { MatchsComponent } from './matchs/matchs.component';
import { ViewBackDrawComponent } from './view-back-draw/view-back-draw.component';
import { ViewSimpleLeagueComponent } from './view-simple-league/view-simple-league.component';
import { ViewClasificationComponent } from './view-clasification/view-clasification.component';


@NgModule({
  declarations: [
    DrawComponent,
    EditResultComponent,
    ViewDrawComponent,
    MatchsComponent,
    ViewBackDrawComponent,
    ViewSimpleLeagueComponent,
    ViewClasificationComponent
  ],
  imports: [
    CommonModule,
    DrawRoutingModule,
    //
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class DrawModule { }
