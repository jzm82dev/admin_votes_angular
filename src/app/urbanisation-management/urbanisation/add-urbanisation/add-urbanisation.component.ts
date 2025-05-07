import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { UrbanisationService } from '../service/urbanisation.service';

@Component({
  selector: 'app-add-urbanisation',
  templateUrl: './add-urbanisation.component.html',
  styleUrls: ['./add-urbanisation.component.scss']
})
export class AddUrbanisationComponent {


  public routes = routes;
  
    public tab_selected: number = 1;
    public president:string = '';
    public name: string = '';
    public mobile: string = '';
    public email: string = '';
    public urbanisation_id: string = '';
  
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
  
    public countries: any = [];
    public country_id: string = '';
    public states: any = [];
    public state_id: string = '';
    public cities: any = [];
    public city_id: string = '';
                       
    constructor( public urbanisationSrv: UrbanisationService){ }

    ngOnInit(): void {
      this.user = this.urbanisationSrv.authSrv.user;
      this.hasPermission();
      this.urbanisationSrv.config().subscribe( (resp:any)=>{
        this.countries = resp.countries;
      })
    }

    hasPermission( permision: string = ''){
      
      if(this.user.role.includes('Super-Admin')){
        this.can_edit = true;
        return true;
      }
  
      if(this.user.permissions.includes('edit_urbanisations') ){
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



  countrySelected(country_id:any){

    this.urbanisationSrv.getStates(country_id).subscribe( (resp: any) => {
        if(resp.message == 200){
          this.states = resp.states;
        }else{
          this.error_message_additionl_data = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
    });
   
  }

  stateSelected(state_id:any){

    this.urbanisationSrv.getCities(state_id).subscribe( (resp: any) => {
        if(resp.message == 200){
          this.cities = resp.cities;
        }else{
          this.error_message_additionl_data = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
    });
   
  }



  saveData(){
    this.cleanMessage();

    if( !this.name || !this.president || !this.mobile || !this.email ){
      this.error_message = 'Nombre, presidente, teléfono y email son obligatorios';
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = 'El nombre no puede superar los 191 caracteres';
      return;
    }

    if( this.president && this.president.length > 50){
      this.error_message = 'El presidente no puede superar los 191 caracteres';
      return;
    }

    if( this.email && this.email.length > 191){
      this.error_message = 'El email no puede superar los 191 caracteres';
      return;
    }

    if( this.mobile && this.mobile.length > 50){
      this.error_message = 'El teléfono no puede superar los 50 caracteres';
      return;
    }

    if( !this.address || !this.postal_code || !this.country_id || !this.state_id || !this.city_id){
      this.error_message_additionl_data = 'Los campos dirección, país, provincia, ciudad y código postal son obligatorios';
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
    formData.append('name', this.name);
    formData.append('president', this.president);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('imagen', this.fileAvatar);
    formData.append('urbanisation_id', this.urbanisation_id)
    formData.append('address', this.address);
    formData.append('additional_address', this.additional_address);
    formData.append('postal_code', this.postal_code);
    formData.append('country_id', this.country_id);
    formData.append('state_id', this.state_id);
    formData.append('city_id', this.city_id);
    


    this.urbanisationSrv.saveUrbanisation(formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message = 'Urbanización guardada correctamente';
        this.urbanisation_id = resp.urbanisation_id;
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido el siguiente error al guardar la urbanización' ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Error interno del sistema. Inténtalo nuevamente y si el problema persiste contacte con el adminitrador.';
      }
    })

  }

  
 
}
