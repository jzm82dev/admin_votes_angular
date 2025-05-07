import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ResultService } from '../service/result.service';
import { DataService } from 'src/app/shared/data/data.service';

@Component({
  selector: 'app-league-result',
  templateUrl: './league-result.component.html',
  styleUrls: ['./league-result.component.scss']
})
export class LeagueResultComponent {
  public routes = routes;

  public email: string = '';
  public categories: any = [];
  public teams: any = [];

  constructor(public data : DataService, public resultSrv: ResultService){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let data = {
      'league_id' : 1
    };
    this.resultSrv.getCategories(data).subscribe( (resp:any) => {
      if(resp.message == 200){
        this.categories = resp.result;
        this.categories.forEach((category:any) => {
          category.teams.sort((a:any,b:any) => b.total_points - a.total_points );
        });
      }
    })
  }
}
