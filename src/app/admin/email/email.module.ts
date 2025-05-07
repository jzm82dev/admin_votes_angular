import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { NewEmailComponent } from './new-email/new-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PotentialClubComponent } from './potential-club/potential-club.component';
import { ListPotentialClubComponent } from './list-potential-club/list-potential-club.component';
import { EditPotentialClubComponent } from './edit-potential-club/edit-potential-club.component';


@NgModule({
  declarations: [
    EmailComponent,
    NewEmailComponent,
    PotentialClubComponent,
    ListPotentialClubComponent,
    EditPotentialClubComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    //form
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class EmailModule { }
