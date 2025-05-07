import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialLinksRoutingModule } from './social-links-routing.module';
import { SocialLinksComponent } from './social-links.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SocialLinksComponent
  ],
  imports: [
    CommonModule,
    SocialLinksRoutingModule,
     //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class SocialLinksModule { }
