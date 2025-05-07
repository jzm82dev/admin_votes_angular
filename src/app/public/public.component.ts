import { Component } from '@angular/core';
import { routes } from '../shared/routes/routes';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {
  public routes = routes;


  constructor(){
  }


}
