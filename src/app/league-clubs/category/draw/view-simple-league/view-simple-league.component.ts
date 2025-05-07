import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TournamentService } from 'src/app/tournament-clubs/tournament/service/tournament.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-view-simple-league',
  templateUrl: './view-simple-league.component.html',
  styleUrls: ['./view-simple-league.component.scss']
})
export class ViewSimpleLeagueComponent {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebutton_schedule') closebutton_schedule: any;
  public routes = routes;

  public league_id:string = '';
  public tournament_id: string = '';
  public category_id: string = '';
  public category_type: string = '';
  public name: string = '';
  public translations:any = [];
  public user: any;
  public can_edit:boolean = false; 
  public category_selected: any;
  public isLoaded: boolean = false;
  public matches_league: any = [];
  public couple_selected_id: string = ''; 
  public match_type:string = 'double';


  constructor(public categorySrv: CategoryService, public tournamentSrv: TournamentService, public activateRoute: ActivatedRoute, public translate: TranslateService){}

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

  ngOnInit(): void {
    this.user = this.categorySrv.authSrv.user;
    this.initializeLanguage();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.id;
      this.couple_selected_id = resp.couple_id;
      this.getCategorySelected();
      this.getMatches();
    });
    
  }

  initializeLanguage(){
    this.translate.use(this.categorySrv.authSrv.language);
    this.translate.setDefaultLang(this.categorySrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues', 'tournaments', 'tournaments.type_category', 'tournaments.tournaments_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
      
  }

  getCategorySelected(){
    this.categorySrv.getCategory(this.category_id).subscribe( (resp:any) => {
      console.log(resp);
      
      this.category_selected = resp.category;
      this.category_type = this.category_selected.type;
      this.name = this.category_selected.name;
      this.tournament_id = this.category_selected.tournament_id;
      this.match_type = resp.category.match_type;
      this.isLoaded=true;
    });
  }

  getMatches(){
    let test:any = [];
    this.tournamentSrv.getMatchsSimpleLeague(this.category_id).subscribe( (resp:any) => {

      for (let index = 0; index <= resp.total_jorneys; index++) {
        this.matches_league[index] =  resp.matches.filter((item:any) => item.journey == index);
      }
      this.getWeekDay();
      // Second leg
      if(this.matches_league.length > 0 && this.category_type == '6'){
        let second_leg_matchday = Math.floor(this.matches_league.length / 2);
        this.matches_league[second_leg_matchday].show_second_leg = true;
        this.matches_league[0].show_first_leg = true;
      }
      this.isLoaded=true;
    });
  }


  getWeekDay(){
    let week_days:any = [];
    week_days.push(this.translations['commun_translations'].day_1);
    week_days.push(this.translations['commun_translations'].day_2); 
    week_days.push(this.translations['commun_translations'].day_3);
    week_days.push(this.translations['commun_translations'].day_4);
    week_days.push(this.translations['commun_translations'].day_5);
    week_days.push(this.translations['commun_translations'].day_6);
    week_days.push(this.translations['commun_translations'].day_7);

    for (let index = 0; index < this.matches_league.length; index++) {
      this.matches_league[index].forEach( (match: any) => {
        if(match.time.length > 0 ){
          const splitVal = match.time.split(' ');
          let day_hour = `${week_days[splitVal[0] - 1]} ${splitVal[1]} `
          match.time = day_hour;
        }else{
          match.time = '--- -- - ';
        }
      });
    }

  
  }

  addResult(matchId:string){
    const w = window.open(`category/draw/edit-result/${matchId}`, '_self');
      if (w) {
          w.focus(); 
      }
  }


  generateDrawPdf(){
    
		const options = {
		  margin: 0.5,
		  filename: 'matchs_' + this.category_selected.name + '.pdf',
      image: {
			type: 'jpeg',
			quality: 500
		  },
		  html2canvas: {
			scale: 1
		  },
		  jsPDF: {
			unit: 'in',
			format: 'a3',
			orientation: 'portrait'
		  }
		}
		const element = document.getElementById('matchs_league');
		html2pdf().from(element).set(options).save();
    
  }

}
