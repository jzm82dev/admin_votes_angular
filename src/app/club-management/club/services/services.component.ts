import { Component } from '@angular/core';
import { ClubService } from '../service/club.service';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  public routes = routes;

  public isLoaded: boolean = false;
  public name: string = '';
  public club_manager:string = '';
  public user: any;
  public can_edit:boolean = false; 
  public data_service: any;

  public pool: any;
  public gym: any;
  public playroom: any;
  public cafe: any;
  public restaurant: any;
  public shop: any;

  public name_service: string = '';
  public new_services:any = [];
  public error_message: string = '';
  public success_message: string = '';
  public message_errors:any = [];
  public translations:any = [];

  constructor( public clubSrv: ClubService, public translate: TranslateService ){
  }

  ngOnInit() {
    this.isLoaded = true;

    this.initializeLanguage();
    this.user = this.clubSrv.authSrv.user;
    this.hasPermission();

    this.clubSrv.getServices().subscribe( (resp: any) => {
      this.data_service = resp;
      if( this.data_service.club_services != null){
        if( this.data_service.club_services.pool == 1){
          this.pool = true;
        }else{
          this.pool = false;
        }
        if( this.data_service.club_services.gym == 1){
          this.gym = true;
        }else{
          this.gym = false;
        }
        if( this.data_service.club_services.playroom == 1){
          this.playroom = true;
        }else{
          this.playroom = false;
        }
        if( this.data_service.club_services.cafe == 1){
          this.cafe = true;
        }else{
          this.cafe = false;
        }
        if( this.data_service.club_services.restaurant == 1){
          this.restaurant = true;
        }else{
          this.restaurant = false;
        }
        if( this.data_service.club_services.shop == 1){
          this.shop = true;
        }else{
          this.shop = false;
        }
      }
      if(this.data_service.more_services != null){
        this.new_services = this.data_service.more_services;
      }
    })
    
  }

  initializeLanguage(){
   
    this.translate.use(this.clubSrv.authSrv.language);
    this.translate.setDefaultLang(this.clubSrv.authSrv.language);

    this.translate.get(['commun_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
  
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
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

  addService(){
    if( !this.name_service){
      this.error_message = 'El nombre del servicio es obligatorios';
      return;
    }

    let item = {
      name: this.name_service
    };

    this.new_services.push(item);
    this.name_service = '';
    
  }

  deleteService(index: any){
    this.new_services.splice(index, 1);
  }

  save_services(){ 
    let formData = new FormData();
    if(this.pool ){
      formData.append('pool', '1');
    }else{
      formData.append('pool', '0');
    }

    if(this.gym ){
      formData.append('gym', '1');
    }else{
      formData.append('gym', '0');
    }

    if(this.playroom ){
      formData.append('playroom', '1');
    }else{
      formData.append('playroom', '0');
    }

    if(this.cafe ){
      formData.append('cafe', '1');
    }else{
      formData.append('cafe', '0');
    }

    if(this.restaurant ){
      formData.append('restaurant', '1');
    }else{
      formData.append('restaurant', '0');
    }

    if(this.shop ){
      formData.append('shop', '1');
    }else{
      formData.append('shop', '0');
    }

    console.log(this.new_services);
    formData.append('more_services', JSON.stringify(this.new_services));

    this.clubSrv.storeServices( formData).subscribe( (resp:any) => {
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
