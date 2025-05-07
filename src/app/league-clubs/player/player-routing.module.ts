import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { ListPlayerComponent } from './list-player/list-player.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';

const routes: Routes = [
  { 
    path: '', 
    component: PlayerComponent,
    children: [
    {
      path: 'add-player',
      component: AddPlayerComponent
    },
    {
      path: 'list-player',
      component: ListPlayerComponent
    },
    {
      path: 'list-player/edit/:id',
      component: EditPlayerComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
