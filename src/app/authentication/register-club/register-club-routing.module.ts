import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterClubComponent } from './register-club.component';

const routes: Routes = [{ path: '', component: RegisterClubComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterClubRoutingModule { }
