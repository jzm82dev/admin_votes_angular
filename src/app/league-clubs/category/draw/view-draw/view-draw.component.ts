import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { TranslateService } from '@ngx-translate/core';
import { createBracket } from 'bracketry';
import { TournamentService } from 'src/app/tournament-clubs/tournament/service/tournament.service';
import { CategoryService } from '../../service/category.service';
import html2pdf from 'html2pdf.js';

let data = {
  rounds: [],
  matches: [],
  contestants: {}
};


const options = {
  matchMaxWidth: 300,
  roundTitleColor: "#2e37a4",
  rootBorderColor: "#cdcbcb",
  connectionLinesWidth: 2,
  connectionLinesColor: "#cdcbcb",
  matchTextColor: "#2e37a4",
  matchStatusBgColor: "#2e37a4",
  matchFontSize: 14,
  scrollButtonSvgColor: "#2e37a4",
  navButtonSvgColor: "#2e37a4",
  highlightedConnectionLinesColor: "orangered",
  highlightedPlayerTitleColor: "#0066ff",


  //rootBgColor: "#316581",
  getMatchTopHTML: (dataMatch:any) => {
    return `<div style="color: gray; font-size: 13px; --rootFontFamily: Open Sans, Roboto, sans-serif;">
              <p><span >${dataMatch.time}</span> 
              <span >${dataMatch.court_name}<span></p>
            <div>` 
      /*return `<div style="color: gray; font-size: 13px; --rootFontFamily: Open Sans, Roboto, sans-serif;">
            <a href="google.es"><span >${dataMatch.time}</span> 
            <span >${dataMatch.court_name}<span></a>
          <div>`  */
  },
  onMatchClick: (match:any) => {
    const contestant_local_id = match.sides[0].contestantId;
    const contestant_visiting_id = match.sides[1].contestantId;
    //if(contestant_local_id != 0 && contestant_visiting_id != 0){
      const matchId = match.match_id;
      const w = window.open(`category/draw/edit-result/${matchId}`, '_self');
      if (w) {
          w.focus(); 
      }
    //}
},

  /*onMatchSideClick: (match:any, sideIndex: number) => {
    const matchId = match.time;
    const w = window.open(`category/journeys/2/edit/2/7`, '_blank');
    if (w) {
        w.focus(); // okay now
    }
  }*/
}



@Component({
  selector: 'app-view-draw',
  templateUrl: './view-draw.component.html',
  styleUrls: ['./view-draw.component.scss']
})
export class ViewDrawComponent {

  public routes = routes;
  public category_id: string = '';
  public user: any;  
  public can_edit:boolean = false; 
  public isLoaded: boolean = false;
  public translations:any = [];
  public pending_text:string = '';
  public finished_text:string = '';
  public totalData = 0;
  public total_couples: number = 0;
  public totalTop: number = 0;
  public data: Data = {};
  public contestants: any = [];
  public league_id:string = '';
  public tournament_id: string = '';
  public draw_generated: boolean = false;
  public day_number: number = 1;
  public type_draw: string = '';
  public type_category: string = '';
  public category_name: string = 'draw';

  public rounds:any = [];

  public category_selected: any;

  public total_player_tournament: number[] = [4, 8, 16, 32, 64, 128];

  constructor(public tournamentSrv: TournamentService, public activateRoute: ActivatedRoute, public translate: TranslateService, public categorySrv: CategoryService){}

  ngOnInit(): void {
    this.user = this.tournamentSrv.authSrv.user;
    this.initializeLanguage();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.id;
      this.type_draw = resp.type;
      this.getDraw(this.category_id, this.type_draw);      
    });
  }

  getDraw(category_id: string, type_draw: string){
    
    this.categorySrv.totalCouplesCategory(category_id).subscribe( (resp:any) => {
      this.total_couples = resp.total_couples;
      this.type_category = resp.category_data.type;
      this.league_id = resp.category_data.league_id;
      this.tournament_id = resp.category_data.tournament_id;
      
      this.getTopCoupleNumber();
      this.tournamentSrv.getDraw(this.category_id, 'main').subscribe((resp:any) => {
        this.data = resp;
        for(let i = resp.max_round; i>= 0; i--){
          this.rounds.push({
            'name': this.translations['tournaments'].rounds[i]
          });
        }
        data.rounds = this.rounds;
        data.contestants = resp.contestants;
        data.matches = resp.matches;
        this.category_name = resp.category_name;
        this.getWeekDay();
        
        if(data.matches.length > 0){
          this.draw_generated = true;
        }
        this.isLoaded = true;
        const portalDiv = document.querySelector('#torneo')
        if (!portalDiv) {
            throw new Error("The element #portal wasn't found");
        }
        if( this.draw_generated == true){
          createBracket(data,  portalDiv, options);
        }
      })
    })
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
    
    data.matches.forEach( (match: any) => {
      const splitVal = match.time.split(' ');
      let day_hour = '';
      if( match.time == 'ERROR'){
        day_hour = this.translations['commun_translations'].define_time_court
      }else{
        if( match.time.length > 0 ){
          day_hour = `${week_days[splitVal[0] - 1]} ${splitVal[1]} `
        }
      }
      match.time = day_hour;
      match.court_name = match.court != null ? this.translations['tournaments'].court + ' ' + match.court : ''; 
    });
  }

  getTopCoupleNumber(){
    let flag = false;
    this.total_player_tournament.forEach( (value:number) => {
      if(flag){
        return;
      }
      if( this.total_couples == value){
        flag = true;
        this.totalTop = 0;
        return;
      }
      if(this.total_couples > value){
        // nothing
      }else{
          flag = true;
          this.totalTop = value - this.total_couples ;
          return;
      }
    });
  }

  initializeLanguage(){
    
    this.translate.use(this.tournamentSrv.authSrv.language);
    this.translate.setDefaultLang(this.tournamentSrv.authSrv.language);

    this.translate.get(['commun_translations', 'tournaments', 'leagues'])
      .subscribe((resp:any) => {
        this.translations = resp;
        //this.pending_text = this.translations['leagues'].journeys.pending;
        //this.finished_text = this.translations['leagues'].journeys.finished;
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

  createDraw(){
    this.categorySrv.createDraw( this.category_id).subscribe( (resp: any)=> {
      console.log(resp);
      
    });
  }

  generateDrawPdf(){
    
		const options = {
		  margin: 0.5,
		  filename: 'draw_' + this.category_name + '.pdf',
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
			orientation: 'landscape'
		  }
		}
		const element = document.getElementById('torneo');
		html2pdf().from(element).set(options).save();
    
  }

}
