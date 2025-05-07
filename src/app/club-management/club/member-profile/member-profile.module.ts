import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberProfileRoutingModule } from './member-profile-routing.module';
import { MemberProfileComponent } from './member-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MemberProfileComponent
  ],
  imports: [
    CommonModule,
    MemberProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class MemberProfileModule { }
