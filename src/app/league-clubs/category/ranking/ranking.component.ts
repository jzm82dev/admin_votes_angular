import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { JourneyService } from '../journey/service/journey.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {

  public routes = routes;

  public category_id: string = '';
  public isLoaded: boolean = false;
  public ranking_couples: any = [];
  public translations:any = [];
  public type_matchs = 'double';
  public match_tab_player: string = 'Players';
  public league_id: string = '';
  public category_name: string = '';


  constructor(public journeySrv: JourneyService, public activateRoute: ActivatedRoute, public translate: TranslateService){}

  ngOnInit(): void {
    this.initializeLanguage();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.id;
      this.journeySrv.getRanking(this.category_id).subscribe((resp: any) => {
        this.isLoaded = true;
        this.ranking_couples = resp.ranking;
        this.type_matchs = resp.type_matchs;
        this.category_name = resp.category_name;
        this.league_id = resp.league_id;
        if( this.type_matchs == 'singles'){
          this.match_tab_player = this.translations['leagues'].tabs.players;
        }else{
          this.match_tab_player = this.translations['leagues'].tabs.couples;
        }
      })
    });
  }

  initializeLanguage(){
    this.translate.use(this.journeySrv.authSrv.language);
    this.translate.setDefaultLang(this.journeySrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 

  }


  getCoupleDetail(){
    
  }

}
