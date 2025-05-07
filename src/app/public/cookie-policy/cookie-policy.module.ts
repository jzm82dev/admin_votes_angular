import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookiePolicyRoutingModule } from './cookie-policy-routing.module';
import { CookiePolicyComponent } from './cookie-policy.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from '../home/home-routing.module';


@NgModule({
  declarations: [
    CookiePolicyComponent
  ],
  imports: [
    CommonModule,
    CookiePolicyRoutingModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class CookiePolicyModule { }
