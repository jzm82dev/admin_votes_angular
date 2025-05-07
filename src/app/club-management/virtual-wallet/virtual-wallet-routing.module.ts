import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualWalletComponent } from './virtual-wallet.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { ListWalletComponent } from './list-wallet/list-wallet.component';
import { EditWalletComponent } from './edit-wallet/edit-wallet.component';


const routes: Routes = [
  { 
    path: '', 
    component: VirtualWalletComponent,
    children: [
    {
      path: 'add-wallet',
      component: AddWalletComponent
    },
    {
      path: 'list-wallet',
      component: ListWalletComponent
    },
    {
      path: 'list-wallet/edit/:id',
      component: EditWalletComponent
    },
    {
      path: 'list-wallet/edit/:id/:is_new',
      component: EditWalletComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualWalletRoutingModule { }
