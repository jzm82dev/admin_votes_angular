import { Component } from '@angular/core';
import { PlayerService } from '../service/player.service';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent {

  public routes = routes
  public translations:any = [];
  public league_matches: any = [];
  public tournament_matches: any = [];

  constructor( public playerSrv: PlayerService, public translate: TranslateService){}

  ngOnInit(): void {
    
    this.initializeLanguage();
    this.playerSrv.getMatchs().subscribe((resp:any) => {
      this.league_matches = resp.league_matches;
      this.tournament_matches = resp.tournament_matches;
    });
  }


  initializeLanguage(){
   
    this.translate.use(this.playerSrv.authSrv.language);
    this.translate.setDefaultLang(this.playerSrv.authSrv.language);

    this.translate.get(['commun_translations', 'members', 'members.members_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
  }


}
