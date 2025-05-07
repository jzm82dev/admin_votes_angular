import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { socialLinks } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { ClubService } from '../service/club.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
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

  public instagram_link: string = '';
  public twiter_link: string = '';
  public facebook_link: string = '';
  public youtube_link: string = '';
  public linkedin_link: string = '';


  constructor(public clubService: ClubService, public translate: TranslateService){
      
      
    }


    ngOnInit(): void {
      this.initializeLanguage();
      this.user = this.clubService.authSrv.user;
      this.hasPermission();

      this.clubService.getSocialLinks().subscribe((resp:any) => {
        this.isLoaded = true;
        this.instagram_link = resp.club_social_links.instagram_link;
        this.facebook_link = resp.club_social_links.facebook_link;
        this.twiter_link = resp.club_social_links.twiter_link;
        this.youtube_link = resp.club_social_links.youtube_link;
        this.linkedin_link = resp.club_social_links.linkedin_link;
      })
    }
  
    initializeLanguage(){
      this.translate.use(this.clubService.authSrv.language);
      this.translate.setDefaultLang(this.clubService.authSrv.language);
  
      this.translate.get(['commun_translations', 'club_translations', 'club_translations.club_information_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
       
      }); 
    }

    getData(){

    }

    saveData(){

      let formData = new FormData();

      if( this.instagram_link){
        formData.append('instagram_link', this.instagram_link);
      }

      if( this.twiter_link){
        formData.append('twiter_link', this.twiter_link);
      }

      if( this.facebook_link){
        formData.append('facebook_link', this.facebook_link);
      }

      if( this.youtube_link){
        formData.append('youtube_link', this.youtube_link);
      }

      if( this.linkedin_link){
        formData.append('linkedin_link', this.linkedin_link);
      }

      this.clubService.saveSocialLinks( formData).subscribe( (resp:any ) => {
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

}
