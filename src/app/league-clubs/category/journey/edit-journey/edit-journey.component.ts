import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { JourneyService } from '../service/journey.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-journey',
  templateUrl: './edit-journey.component.html',
  styleUrls: ['./edit-journey.component.scss']
})
export class EditJourneyComponent {
  public routes = routes;
  public category_id: string = '';
  public journey_id: string = '';
  public match_list: any = [];
  public name: string = '';
  public date: string = '';

  public success_message: string = '';
  public error_message: string = '';
  public message_errors: any = [];

  public success_message_data: string = '';
  public error_message_data: string = '';
  public message_errors_data: any = [];


  public old_result_per_match: any[] = [];
  public translations:any = [];

  public user: any;
  public can_edit:boolean = false;
  public type_matchs = 'double';
  public match_tab_player: string = '';



  constructor(public activateRoute: ActivatedRoute, public journeySrv: JourneyService, public translate: TranslateService, date: DateAdapter<Date>){
    if( this.journeySrv.authSrv.language == 'es'){
      date.getFirstDayOfWeek = () => 1;
    }
  }

  ngOnInit(): void {
    this.user = this.journeySrv.authSrv.user;
    this.initializeLanguage();
    this.defaultResult();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.category_id;
      this.journey_id = resp.journey_id;
      this.getJourneySelected();
      
    })
  }

  initializeLanguage(){
    this.translate.use(this.journeySrv.authSrv.language);
    this.translate.setDefaultLang(this.journeySrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues'])
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

  getJourneySelected(){
    this.journeySrv.getMatchsJourney(this.journey_id).subscribe( (resp:any) => {
      this.match_list = resp.matchs;
      
      this.type_matchs = resp.type_matchs;
      if( this.type_matchs == 'singles'){
        this.match_tab_player = this.translations['leagues'].tabs.players;
      }else{
        this.match_tab_player = this.translations['leagues'].tabs.couples;
      }

      this.formatResults();
      this.name = resp.journey_name;
      this.date = new Date(resp.date).toISOString();
      this.defaultResult();
    });
  }

  formatResults(){
    let arrayRestul;

    this.match_list.forEach((match:any) => {
      if( match.result_set_1 != null && match.result_set_1.length == 3){
        arrayRestul = match.result_set_1.split('-');
        match.result_set_1_local = arrayRestul[0];
        match.result_set_1_visiting = arrayRestul[1];
        match.result_set_1 = null;
      }
      if( match.result_set_2 != null && match.result_set_2.length == 3){
        arrayRestul = match.result_set_2.split('-');
        match.result_set_2_local = arrayRestul[0];
        match.result_set_2_visiting = arrayRestul[1];
        match.result_set_2 = null;
      }
      if( match.result_set_3 != null && match.result_set_3.length == 3){
        arrayRestul = match.result_set_3.split('-');
        match.result_set_3_local = arrayRestul[0];
        match.result_set_3_visiting = arrayRestul[1];
        match.result_set_3 = null;
      }
    });
    
  }

  defaultResult(){
    this.old_result_per_match = [];
    this.match_list.forEach((element:any) => {
      let data = {
        'match': element.id,
        'local_team': element.local_team,
        'visiting_team': element.visiting_team,
        'result_set_1_local' : element.result_set_1_local,
        'result_set_2_local' : element.result_set_2_local,
        'result_set_3_local' : element.result_set_3_local,
        'result_set_1_visiting' : element.result_set_1_visiting,
        'result_set_2_visiting' : element.result_set_2_visiting,
        'result_set_3_visiting' : element.result_set_3_visiting,
      }
      this.old_result_per_match.push(data);
    });
  }


  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
    this.error_message_data = '';
    this.success_message_data = '';
    this.message_errors_data = [];
  }

  checkSetResult(event: KeyboardEvent) {
    const pattern = /[0-7-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  saveData(){
   
    this.cleanMessage();
    
    if( this.name == '' ){
      this.error_message = this.translations["leagues.leagues_messages"].error_1;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = this.translations["leagues.leagues_messages"].error_2;
      return;
    }

    if( this.date == '' ){
      this.error_message = this.translations["leagues.leagues_messages"].error_3;
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('date', this.date);

    this.journeySrv.editJourney(this.journey_id, formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message_data = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message_data = this.translations['commun_translations'].data_save_error ;
        this.message_errors_data = resp.errors_text
      } else {
        this.error_message_data = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })
    
  }


  saveResult(){

    this.cleanMessage();

    this.match_list.forEach((match: any) => {
        if(match.result_set_1_local && match.result_set_1_visiting){
          match.result_set_1 = match.result_set_1_local + '-' + match.result_set_1_visiting;
        }
        if(match.result_set_2_local && match.result_set_2_visiting){
          match.result_set_2 = match.result_set_2_local + '-' + match.result_set_2_visiting;
        }
        if(match.result_set_3_local && match.result_set_3_visiting){
          match.result_set_3 = match.result_set_3_local + '-' + match.result_set_3_visiting;
        }
    });

    if(this.correctResult() == true ){

      this.checkUpdateResult();
      let formData = new FormData();

     

      formData.append('results', JSON.stringify(this.match_list));

      this.journeySrv.saveResult(this.category_id, formData).subscribe((resp:any) => {
        if( resp.message == 200){
          this.success_message = this.translations['commun_translations'].data_save_correctly;
          this.getJourneySelected();
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].data_save_error ;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
        
      })
    }
  }

  checkUpdateResult(){

    let cont = this.match_list.length;
    for(let i = 0; i< cont; i++){
      if( this.match_list[i].result_set_1_local != this.old_result_per_match[i].result_set_1_local 
          || this.match_list[i].result_set_2_local != this.old_result_per_match[i].result_set_2_local 
          || this.match_list[i].result_set_3_local != this.old_result_per_match[i].result_set_3_local
          || this.match_list[i].result_set_1_visiting != this.old_result_per_match[i].result_set_1_visiting 
          || this.match_list[i].result_set_2_visiting != this.old_result_per_match[i].result_set_2_visiting 
          || this.match_list[i].result_set_3_visiting != this.old_result_per_match[i].result_set_3_visiting){
                this.match_list[i].change_result = true;
      }else{
        this.match_list[i].change_result = false;
      }
    }
  }

  correctResult(){
    
    let pattern = /^(6|7)-[0-7]$|^[0-7]-(6|7)$/;
    let cont = this.match_list.length;

    console.log(this.match_list);
    

    for(let i = 0; i< cont; i++){

      if( (this.match_list[i].result_set_1 == '' || this.match_list[i].result_set_1 == null) && 
          ((this.match_list[i].result_set_2 != '' && this.match_list[i].result_set_2 != null) || (this.match_list[i].result_set_3 != '' && this.match_list[i].result_set_3 != null)) ){
            this.error_message = 'Falta el resultado del Set 1 del partido ' + (i + 1);
            return false;
      }

      if( (this.match_list[i].result_set_2 == '' || this.match_list[i].result_set_2 == null) && 
          (this.match_list[i].result_set_3 != '' &&  this.match_list[i].result_set_3 != null) ){
            this.error_message = 'Falta el resultado del Set 2 del partido ' + (i + 1); 
            return false;
      }

      if( (this.match_list[i].result_set_3 != '' && this.match_list[i].result_set_3 != null) && 
          ( this.match_list[i].result_set_1 == '' || this.match_list[i].result_set_1 == null || this.match_list[i].result_set_2 == '' || this.match_list[i].result_set_2 == null ) ){
            this.error_message = 'Falta el resultado del Set 1 o 2 del partido ' + (i + 1); 
      }


      if (this.match_list[i].result_set_1 != '' && this.match_list[i].result_set_1 != null && !pattern.test(this.match_list[i].result_set_1)) {
        this.error_message = 'Resultado incorrecto del Set 1 del partido ' + (i + 1);
        return false;
      }
      if (this.match_list[i].result_set_2 != '' && this.match_list[i].result_set_2 != null && !pattern.test(this.match_list[i].result_set_2)) {
        this.error_message = 'Resultado incorrecto del Set 2 del partido ' + (i + 1);
        return false;
      }
      if (this.match_list[i].result_set_3 != '' && this.match_list[i].result_set_3 != null && !pattern.test(this.match_list[i].result_set_3)) {
        this.error_message = 'Resultado incorrecto del Set 3 del partido ' + (i + 1);
        return false;
      }
      
    }

    return true;
  }

}
