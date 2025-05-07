import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualWalletRoutingModule } from './virtual-wallet-routing.module';
import { VirtualWalletComponent } from './virtual-wallet.component';
import { ListWalletComponent } from './list-wallet/list-wallet.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { EditWalletComponent } from './edit-wallet/edit-wallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VirtualWalletComponent,
    ListWalletComponent,
    AddWalletComponent,
    EditWalletComponent
  ],
  imports: [
    CommonModule,
    VirtualWalletRoutingModule,
    //forms
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class VirtualWalletModule { }
