import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from 'src/app/tournament-clubs/tournament/service/tournament.service';
import { CategoryService } from '../../service/category.service';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent {

  public routes = routes;
  public category_id: string = '';
  public user: any;  
  public can_edit:boolean = false; 
  public isLoaded: boolean = false;
  public translations:any = [];
  public tournament_id: string = '';
  public draw_generated:boolean = false; 
  public total_couples: number = 0;

  constructor(public tournamentSrv: TournamentService, public activateRoute: ActivatedRoute, 
      public translate: TranslateService, public categorySrv: CategoryService){}


      ngOnInit(): void {
        this.user = this.tournamentSrv.authSrv.user;
        this.initializeLanguage();
        this.activateRoute.params.subscribe( (resp:any) => {
          this.category_id = resp.id;
        });
      }

      initializeLanguage(){
    
        this.translate.use(this.tournamentSrv.authSrv.language);
        this.translate.setDefaultLang(this.tournamentSrv.authSrv.language);
    
        this.translate.get(['commun_translations', 'tournaments', 'leagues'])
          .subscribe((resp:any) => {
            this.translations = resp;
          }); 
      }

      hasPermission( permision: string = ''){
        if(this.user.role.includes('Super-Admin')){
          this.can_edit = true;
          return true;
        }
    
        if(this.user.permissions.includes(permision) ){
          this.can_edit = true;
          return true;
        }
    
        return false;
      }
}
