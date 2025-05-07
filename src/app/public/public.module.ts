import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { GetPlayerPipe } from './pipe/get-player.pipe';


@NgModule({
  declarations: [
    PublicComponent,
    DetailsComponent,
    GetPlayerPipe,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class PublicModule { }
