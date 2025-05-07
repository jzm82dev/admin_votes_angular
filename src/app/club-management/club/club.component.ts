import { Component } from '@angular/core';
import { ClubService } from './service/club.service';
import { routes } from 'src/app/shared/routes/routes';
import { TranslateService } from '@ngx-translate/core';

interface ScheduleDay {
  id: string;
  day_name: string;
  closed: boolean;
  hours: any[]
}

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent {

  public routes = routes;

  public tab_selected: number = 1;
  public cif:string = '';
  public name: string = '';
  public club_manager: string = '';
  public mobile: string = '';
  public email: string = '';

  public address: string = '';
  public additional_address: string = '';
  public postal_code: string = '';
  public fileAvatar: any;
  public image_preview: any = 'assets/img/img-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public success_message_additionl_data: string = '';
  public error_message_additionl_data: string = '';
  public message_errors: any = [];
  public message_errors_additional_data: any = [];
  public message_consult_admin: string = '';

  public modifySchedule: boolean = true;
  public text_schedule_title: string = 'Añade horario diario';

  public club: any;
  public translations:any = [];
  
  public flag: boolean = true;    
  public user: any;  
  public can_edit:boolean = false;    
  public language: string = 'en';  
  public test:any;

  public countries: any = [];
  public country_id: string = '';
  public states: any = [];
  public state_id: string = '';
  public cities: any = [];
  public city_id: string = '';
  public user_can_book: any;
                                  
  constructor( public clubSrv: ClubService, public translate: TranslateService){
   
  }

  ngOnInit(): void {
    
    this.initializeLanguage();
    
    this.user = this.clubSrv.authSrv.user;
    this.hasPermission();
    this.clubSrv.getClubProfileData().subscribe((resp:any) => {
      if( resp.club_data ){
          this.club = resp.club_data;
          this.cif = this.club.cif;
          this.name = this.club.name;
          this.club_manager = this.club.manager;
          this.mobile = this.club.mobile;
          this.user_can_book = this.club.users_can_book;
          this.email = this.club.email;
          this.countries = resp.countries;
          this.states = resp.states;
          this.cities = resp.cities;
          if( this.club.avatar ){
            this.image_preview = this.club.avatar;
          }
          if( this.club.additional_info ){
            this.address = this.club.additional_info.address 
            this.additional_address = this.club.additional_info.additional_address    
            this.postal_code = this.club.additional_info.postal_code
            this.country_id = this.club.additional_info.country_id;
            this.state_id = this.club.additional_info.state_id;
            this.city_id = this.club.additional_info.city_id;
          }
      }
    })
  }

  initializeLanguage(){
    //const browserLang = this.translate.getBrowserLang();
    //this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

    //this.translate.use(this.clubSrv.authSrv.language);
    //this.test = this.translate.instant('club_translations.tabs.general_data');
    //console.log(this.test);
    this.translate.use(this.clubSrv.authSrv.language);
    this.translate.setDefaultLang(this.clubSrv.authSrv.language);

    this.translate.get(['commun_translations', 'club_translations.club_information_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
  }


  hasPermission( permision: string = ''){
    if(this.user.role.includes('Super-Admin')){
      this.can_edit = true;
      return true;
    }

    if(this.user.permissions.includes('edit_club') ){
      this.can_edit = true;
      return true;
    }

    return false;
  }

  loadFile( $event: any ){
     if( $event.target.files[0].type.indexOf('image') < 0){
      alert(this.translations['commun_translations'].only_type_img);
      this.image_preview = this.image_preview ? this.image_preview : 'assets/img/user-06.jpg';
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
    this.success_message_additionl_data = '';
    this.error_message_additionl_data = '';
    this.message_errors = [];
  }

  
  saveData(){
    this.cleanMessage();
    
    if( !this.name || !this.cif || !this.mobile || !this.email ){
      this.error_message = this.translations["club_translations.club_information_messages"].error_1;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = this.translations["club_translations.club_information_messages"].error_2;
      return;
    }

    if( this.cif && this.cif.length > 50){
      this.error_message = this.translations["club_translations.club_information_messages"].error_12;
      return;
    }

    if( this.club_manager && this.club_manager.length > 191){
      this.error_message = this.translations["club_translations.club_information_messages"].error_3;
      return;
    }

    if( this.email && this.email.length > 191){
      this.error_message = this.translations["club_translations.club_information_messages"].error_4;
      return;
    }

    if( this.mobile && this.mobile.length > 50){
      this.error_message = this.translations["club_translations.club_information_messages"].error_5;
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('cif', this.cif);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('imagen', this.fileAvatar);
    formData.append('club_manager', this.club_manager);
    
    if(this.user_can_book ){
      formData.append('users_can_book', '1');
    }else{
      formData.append('users_can_book', '0');
    }


    this.clubSrv.updateDataClub(formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })
    
  }


  saveAdditionalData(){
    
    this.cleanMessage();
  
    if( !this.address || !this.postal_code || !this.country_id || !this.state_id || !this.city_id){
      this.error_message_additionl_data = this.translations["club_translations.club_information_messages"].error_6;
      return;
    }


    if( this.address && this.address.length > 191){
      this.error_message_additionl_data = this.translations["club_translations.club_information_messages"].error_7;
     return;
    }

    if( this.additional_address && this.additional_address.length > 191){
      this.error_message_additionl_data = this.translations["club_translations.club_information_messages"].error_8;
      return;
    }

    if( this.postal_code && this.postal_code.length > 10){
      this.error_message_additionl_data = this.translations["club_translations.club_information_messages"].error_11;
      return;
    }

   

    let formData = new FormData();
    formData.append('address', this.address);
    formData.append('additional_address', this.additional_address);
    formData.append('postal_code', this.postal_code);
    formData.append('country_id', this.country_id);
    formData.append('state_id', this.state_id);
    formData.append('city_id', this.city_id);
    
    
    this.clubSrv.updateAdditionalDataClub(formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message_additionl_data = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message_additionl_data = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message_additionl_data = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })


  }

  countrySelected(country_id:any){

    this.clubSrv.getStates(country_id).subscribe( (resp: any) => {
        if(resp.message == 200){
          this.states = resp.states;
        }else{
          this.error_message_additionl_data = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
    });
   
  }

  stateSelected(state_id:any){

    this.clubSrv.getCities(state_id).subscribe( (resp: any) => {
        if(resp.message == 200){
          this.cities = resp.cities;
        }else{
          this.error_message_additionl_data = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
    });
   
  }

}
