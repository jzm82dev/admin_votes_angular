import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPasswordRoutingModule } from './new-password-routing.module';
import { NewPasswordComponent } from './new-password.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    SharedModule
  ]
})
export class NewPasswordModule { }
