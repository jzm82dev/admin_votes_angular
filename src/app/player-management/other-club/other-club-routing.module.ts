import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherClubComponent } from './other-club.component';

const routes: Routes = [{ path: '', component: OtherClubComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherClubRoutingModule { }
