import { Component } from '@angular/core';
import { CourtsService } from '../service/courts.service';
import { routes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


interface WeekDay {
  name: string;
  colour: string;
}

@Component({
  selector: 'app-add-court',
  templateUrl: './add-court.component.html',
  styleUrls: ['./add-court.component.scss']
})
export class AddCourtComponent {
  public routes = routes;

  public image_preview: any = 'assets/img/img-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public hoursSelected: any = [];
  public allHourSelectDay: any = [];
  public hourDays:any = [];

  public name: string = '';
  public description: string = '';
  public fileAvatar: any;
  public amount_without_light: number = 0;
  public amount_with_light: number = 0;
  public amount_member_without_light: number = 0;
  public amount_member_with_light: number = 0;
  public allHourDay: any = [];
  public hide_button: boolean = true;
  public save_button: boolean = true;
  public update_button: boolean = false;
  public courtId: string = '';
  public message_errors: any = [];
  public translations:any = [];
  public kind_sport: any = [];
  public type_sport: string = '0'; 


  constructor( public courtSrv: CourtsService, public router: Router, public translate: TranslateService){
  }

  ngOnInit(): void {
    this.initializeLanguage();
    this.courtSrv.config().subscribe( (resp:any)=>{
      this.hourDays = resp.hours_days;
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

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
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

    if( this.courtId == '' ){
      this.courtSrv.storeCourt( formData).subscribe( (resp:any ) => {
        if( resp.message == 200){
          this.courtId = resp.court_id;
          this.error_message = '';
          this.hide_button = false;
          this.success_message = this.translations['commun_translations'].data_save_correctly;
          setTimeout(() => {
            this.success_message = '';
            //this.router.navigate(['club/courts/edit/' + resp.court_id]);
          }, 5000);
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].data_save_error ;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
        
      })
    }else{
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


}
