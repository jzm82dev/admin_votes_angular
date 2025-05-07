import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyWaitScreenComponent } from './verify-wait-screen.component';

const routes: Routes = [{ path: '', component: VerifyWaitScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyWaitScreenRoutingModule { }
