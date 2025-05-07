import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { CategoryService } from '../service/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent {

  public routes = routes;

  public category_id: string = '';

  constructor(public categorySrv: CategoryService, public activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.id;
    })
  }

}
