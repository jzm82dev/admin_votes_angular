import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TournamentService } from 'src/app/tournament-clubs/tournament/service/tournament.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-view-clasification',
  templateUrl: './view-clasification.component.html',
  styleUrls: ['./view-clasification.component.scss']
})
export class ViewClasificationComponent {

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
  public category_clasification: any = [];
  public category_clasification_a: any = [];
  public category_clasification_b: any = [];
  public matches_league: any = [];
  public sport_type: string = '';
  public file_table_name: string = '';


  
  constructor(public tournamentSrv: TournamentService, public categorySrv: CategoryService, 
              public activateRoute: ActivatedRoute, public translate: TranslateService ){}

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
      this.getClasification()
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

 

  getClasification(){
    this.tournamentSrv.getClasification(this.category_id).subscribe((resp: any) => {
      this.isLoaded = true;
      this.category_clasification = resp.ranking;
      this.category_selected = resp.category_data;
      this.category_type = this.category_selected.type;
      this.name = this.category_selected.name;
      this.tournament_id = this.category_selected.tournament_id;
      this.separateByGroups();
      this.isLoaded=true;
      this.sport_type = resp.sport_type;
      if(this.sport_type == '1' || this.sport_type == '2' ){
        this.file_table_name = this.translations['leagues'].games;
      }else{
        this.file_table_name = this.translations['leagues'].points;
      }
    })
  }

  separateByGroups(){
    if(this.category_type == '2'){
      this.category_clasification_a =  this.category_clasification.filter((item:any) => item.league_number == 1);
      this.category_clasification_b =  this.category_clasification.filter((item:any) => item.league_number == 2);
    }
  }

  generateDrawPdf(){
    
		const options = {
		  margin: 0.5,
		  filename: 'clasification_' + this.category_selected.name + '.pdf',
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
		const element = document.getElementById('clasification');
		html2pdf().from(element).set(options).save();
    
  }


}



