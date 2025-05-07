import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { CourtsService } from '../service/courts.service';
import { TranslateService } from '@ngx-translate/core';

interface WeekDay {
  name: string;
  colour: string;
}

@Component({
  selector: 'app-edit-court',
  templateUrl: './edit-court.component.html',
  styleUrls: ['./edit-court.component.scss']
})

export class EditCourtComponent {

  public routes = routes;

  public image_preview: any = 'assets/img/img-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  
  public name: string = '';
  public description: string = '';
  public amount_without_light: number = 0;
  public amount_with_light: number = 0;
  public amount_member_without_light: number = 0;
  public amount_member_with_light: number = 0;
  public fileAvatar: any;
  public allHourDay: any = [];
  public courtId: any;
  public court_selected: any;
  public message_errors: any = [];
  public user: any;  
  public can_edit:boolean = false;
  public translations:any = [];
  public kind_sport: any = [];
  public type_sport: string = '0'; 

  constructor( public courtSrv: CourtsService, public activateRoute: ActivatedRoute, public translate: TranslateService){}

  ngOnInit(): void {
    this.initializeLanguage();
    this.user = this.courtSrv.authSrv.user;
    this.hasPermission();
    this.activateRoute.params.subscribe((resp:any) => {
      this.courtId = resp.id;
      this.getCourtSelected();
    })
    
  }

  initializeLanguage(){
    this.translate.use(this.courtSrv.authSrv.language);
    this.translate.setDefaultLang(this.courtSrv.authSrv.language);

    this.translate.get(['commun_translations', 'club_translations', 'club_translations.club_information_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.getTypeSports();
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

  getTypeSports(){
    
    this.kind_sport.push(
      { id: 0, name: '...'},
      { id: 1, name: this.translations["club_translations"].sport_1},
      { id: 2, name: this.translations["club_translations"].sport_2},
      { id: 3, name: this.translations["club_translations"].sport_3},
      { id: 4, name: this.translations["club_translations"].sport_4},
      { id: 5, name: this.translations["club_translations"].sport_5}
    );
  }


  getCourtSelected(){
    this.courtSrv.getCourt( this.courtId).subscribe( (resp:any) => {
      this.court_selected = resp.court;
      this.name = this.court_selected.name;
      this.type_sport = this.court_selected.sport_type;
      this.description = this.court_selected.description;
      if(this.court_selected.avatar){
        this.image_preview = this.court_selected.avatar;
      }
      this.amount_without_light = this.court_selected.amount_without_light;
      this.amount_with_light = this.court_selected.amount_with_light;
      this.amount_member_without_light = this.court_selected.amount_member_without_light;
      this.amount_member_with_light = this.court_selected.amount_member_with_light;
    })
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
    this.message_errors = [];
  }

  save(){ 

    this.cleanMessage();

    if( this.name == '' ){
      this.error_message = 'El campo Nombre es obligatorio';
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = 'El campo Nombre no puede tener una longitud mayor a 191 caracteres';
      return;
    }

    if( this.type_sport == '' || this.type_sport == '0'){
      this.error_message = 'El campo Tipo de pista es obligatorio';
      return;
    }

    if( this.description && this.description.length > 191){
      this.error_message = 'El campo Descripción no puede tener una longitud mayor a 191 caracteres';
      return;
    }

    if (this.amount_without_light && typeof(this.amount_without_light) != "number") {
      this.error_message = 'El campo Precio sin luz tiene que ser un número';
      return;
    }

    if (this.amount_with_light && typeof(this.amount_with_light) != "number") {
      this.error_message = 'El campo Precio con luz tiene que ser un número';
      return;
    }

    if (this.amount_member_without_light && typeof(this.amount_member_without_light) != "number") {
      this.error_message = 'El campo Precio socio sin luz tiene que ser un número';
      return;
    }

    if (this.amount_member_with_light && typeof(this.amount_member_with_light) != "number") {
      this.error_message = 'El campo Precio socio con luz tiene que ser un número';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('sport_type', this.type_sport);

    if( this.description){
      formData.append('description', this.description);
    }

    if( this.amount_without_light){
      formData.append('amount_without_light', this.amount_without_light.toString());
    }

    if( this.amount_with_light){
      formData.append('amount_with_light', this.amount_with_light.toString());
    }
    if( this.amount_member_without_light){
      formData.append('amount_member_without_light', this.amount_member_without_light.toString());
    }
    if( this.amount_member_with_light){
      formData.append('amount_member_with_light', this.amount_member_with_light.toString());
    }
    
    formData.append('imagen', this.fileAvatar);
   


    this.courtSrv.updateCourt(this.courtId, formData).subscribe( (resp:any ) => {
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

  
}
