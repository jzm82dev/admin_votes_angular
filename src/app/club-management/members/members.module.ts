import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MembersComponent,
    AddMemberComponent,
    ListMemberComponent,
    EditMemberComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    //forms
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class MembersModule { }
