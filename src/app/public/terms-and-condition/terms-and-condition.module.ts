import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsAndConditionRoutingModule } from './terms-and-condition-routing.module';
import { TermsAndConditionComponent } from './terms-and-condition.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TermsAndConditionComponent
  ],
  imports: [
    CommonModule,
    TermsAndConditionRoutingModule,
    SharedModule
  ]
})
export class TermsAndConditionModule { }
