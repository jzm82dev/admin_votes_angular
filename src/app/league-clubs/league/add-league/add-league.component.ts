import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { LeagueService } from '../service/league.service';
import { CategoryService } from 'src/app/league-clubs/category/service/category.service';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrls: ['./add-league.component.scss']
})
export class AddLeagueComponent {
  
  @ViewChild('closebutton') closebutton: any;
  public routes = routes;
  public name: string = '';
  public date_start: string = '';
  public points_per_win_2_0: number = 0;
  public points_per_win_2_1: number = 0;
  public points_per_lost_0_2: number = 0;
  public points_per_lost_1_2: number = 0;
  public fileAvatar: any;
  public image_preview: any = 'assets/img/img-06.jpg';
  public league_inserted_id = '';
  public success_message: string = '';
  public error_message: string = '';
  public message_errors: any = [];
  public message_errors_category:any = [];
  public can_edit:boolean = false; 
  public name_category: string = '';
  public description_category: string = '';
  public categories_list: any = [];
  public error_message_category: string = '';
  public success_message_category: string = '';
  public user: any;
  public translations:any = [];
  public type_sport: string = '0';
  public price: number = 0;

  public courts: any = [];
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;
  public kind_sport: any = [];
  public match_types: any = [];
  public match_type_id: string = '0';
  public tab_selected: number = 1;
  public id_league: number = 0;
  public category_selected_id: any;
  public category_selected_name: string = '';
  public index:any;


  constructor( public leagueSrv: LeagueService, public categorySrv: CategoryService, public translate: TranslateService, date: DateAdapter<Date> ){
    if( this.leagueSrv.authSrv.language == 'es'){
      date.getFirstDayOfWeek = () => 1;
    }
  }

  ngOnInit(): void {
    this.initializeLanguage();
    this.user = this.leagueSrv.authSrv.user;
    this.leagueSrv.config().subscribe( (resp:any)=>{
      this.courts = resp.courts;
      this.typeOfCourtsClub();
      this.typeMatch();
    });
  }

  initializeLanguage(){
    
    this.translate.use(this.leagueSrv.authSrv.language);
    this.translate.setDefaultLang(this.leagueSrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues', 'leagues.leagues_messages', 'club_translations', 'tournaments.tournaments_messages'])
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

  loadFile( $event: any ){
    if( $event.target.files[0].type.indexOf('image') < 0){
      alert(this.translations['commun_translations'].only_type_img);
      this.image_preview = this.image_preview ? this.image_preview : 'assets/img/img-06.jpg';
      return;
    }
    if($event.target.files[0].size > 2000000){
      alert(this.translations['commun_translations'].max_size_img);
      this.fileAvatar = '';
      return;
    }
    this.fileAvatar = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.error_message_category = '';
    this.success_message_category = '';
  }
  
  save(){

    this.cleanMessage();
    if( this.name == '' ){
      this.error_message = this.translations["leagues.leagues_messages"].error_1;
      return;
    }

    if( this.type_sport == '0' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_13;
      return;
    }
    
    if( this.type_sport == '2'){
      if( this.match_type_id == '0' ){
        this.error_message = this.translations["leagues.leagues_messages"].error_11;
        return;
      }
    }
    
    if( this.name && this.name.length > 191){
      this.error_message = this.translations["leagues.leagues_messages"].error_2;
      return;
    }

    if( this.date_start == '' ){
      this.error_message = this.translations["leagues.leagues_messages"].error_3;
      return;
    }

    if (typeof + this.points_per_win_2_0 != "number"){
      this.error_message = this.translations["leagues.leagues_messages"].error_4;
      return;
    }

    if (typeof + this.points_per_win_2_1 != "number"){
      this.error_message = this.translations["leagues.leagues_messages"].error_8;
      return;
    }
    
    if (typeof + this.points_per_lost_0_2 != "number"){
      this.error_message = this.translations["leagues.leagues_messages"].error_9;
      return;
    }

    if (typeof + this.points_per_lost_1_2 != "number"){
      this.error_message = this.translations["leagues.leagues_messages"].error_10;
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('sport_type', this.type_sport);
    formData.append('points_per_win_2_0', this.points_per_win_2_0.toString());
    formData.append('points_per_win_2_1', this.points_per_win_2_1.toString());
    formData.append('points_per_lost_0_2', this.points_per_lost_0_2.toString());
    formData.append('points_per_lost_1_2', this.points_per_lost_1_2.toString());
    formData.append('start_date', this.date_start);
    formData.append('imagen', this.fileAvatar);

    formData.append('price', this.price.toString());

    if(this.match_type_id == '1'){
      formData.append('match_type', 'double');
    }
    if(this.match_type_id == '2'){
      formData.append('match_type', 'singles');
    }
    
    this.leagueSrv.storeLeague(formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.league_inserted_id = resp.id_league;
        this.id_league = resp.id_league;
        this.success_message = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 403) {
        this.error_message = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })
    
  }

  addCategory(){
    this.cleanMessage();

    if( !this.name_category ){
      this.error_message = this.translations["leagues.leagues_messages"].error_6;
      return;
    }

    let item = {
      id: null,
      name: this.name_category,
      description: this.description_category,
      league_id: this.league_inserted_id,
      total_couple: 0
    };

    this.categorySrv.storeCategory(item).subscribe( (resp:any) => {
      if( resp.message == 200){
        item.id = resp.category_id;
        this.categories_list.push(item);
        this.name_category = '';
        this.description_category = '';
        this.success_message_category = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message_category = this.translations['commun_translations'].data_save_error ;
        this.message_errors_category = resp.errors_text
      } else {
        this.error_message_category = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })

  }
  
  deleteCategory(){
    this.cleanMessage();
    this.categorySrv.deleteCategory(this.category_selected_id).subscribe( (resp: any) => {
      if(resp.message == 200){
        this.categories_list.splice(this.index, 1);
        this.name_category = '';
        this.description_category = '';
        this.category_selected_name = '';
        this.category_selected_id = '';
        this.closebutton.nativeElement.click();
        this.success_message_category = this.translations["leagues.leagues_messages"].success_delete;
      }else{
        this.success_message_category = this.translations['commun_translations'].data_delete_error;
      }
    })
    
  }

  typeMatch(){
    this.match_types.push( 
      {
        id: 0,
        name: '...'
      },
      {
        id: 1,
        name: this.translations["club_translations"].match_type_double
      },
      {
        id: 2,
        name: this.translations["club_translations"].match_type_single
      }
    )
  }

  typeOfCourtsClub(){

    this.kind_sport.push( { id: 0, name: '...'});
    
    this.courts.some((court: any) => {
      if (court.sport_type == 1) {
        this.hasPadelCourts = true;
      }
      if (court.sport_type == 2) {
        this.hasTennisCourts = true;
      }
      if (court.sport_type == 3) {
        this.hasPickleballCourts = true;
      }
      if (court.sport_type == 4) {
        this.hasSquashCourts = true;
      }
      if (court.sport_type == 5) {
        this.hasBadmintonCourts = true;
      }
     
    });

    if(this.hasPadelCourts){
      this.kind_sport.push({ id: 1, name: this.translations["club_translations"].sport_1});
    }

    if(this.hasTennisCourts){
      this.kind_sport.push({ id: 2, name: this.translations["club_translations"].sport_2});
    }

    if(this.hasPickleballCourts){
      this.kind_sport.push({ id: 3, name: this.translations["club_translations"].sport_3});
    }

    if(this.hasSquashCourts){
      this.kind_sport.push({ id: 4, name: this.translations["club_translations"].sport_4});
    }

    if(this.hasBadmintonCourts){
      this.kind_sport.push({ id: 5, name: this.translations["club_translations"].sport_5});
    }
    
  }

  tabSeleted(value: number){
    this.tab_selected = value;
  }

  selectCategory( category:any, index: any){
    this.category_selected_id = category.id;
    this.category_selected_name = category.name;
    this.index = index;
  }

}
