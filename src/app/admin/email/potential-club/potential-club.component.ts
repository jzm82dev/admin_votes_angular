import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/shared/routes/routes';
import { EmailService } from '../service/email.service';
@Component({
  selector: 'app-potential-club',
  templateUrl: './potential-club.component.html',
  styleUrls: ['./potential-club.component.scss']
})
export class PotentialClubComponent {
  
  public routes = routes;
  public selectedValue !: string;
  public name: string = '';
  public email: string = '';
  public mobile: string = '';
  public member_id:string = '';
  public comment: string = '';


  public success_message_member : string = '';
  public error_message: string = '';
  public isLoaded: boolean = false;
  public can_edit:boolean = false;
  public rolsAdded: any = [];

  public user: any;
  public translations:any = [];
  public message_errors: any = [];
  public message_errors_member:any = [];
  public error_message_member: string = '';

  constructor( public emailSrv: EmailService, public translate: TranslateService ){}

  ngOnInit(): void {
    this.initializeLanguage();
    this.user = this.emailSrv.authSrv.user;
    this.hasPermission();
 }


 
 initializeLanguage(){
  this.translate.use(this.emailSrv.authSrv.language);
  this.translate.setDefaultLang(this.emailSrv.authSrv.language);

  this.translate.get(['commun_translations', 'members.members_messages', 'club_translations'])
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


  
  cleanMessage(){
    this.error_message = '';
    this.success_message_member = '';
    this.error_message_member = '';
    this.message_errors_member = [];
  }

  

  save(){

    
    this.cleanMessage();
    
    if( this.name == '' ){
      this.error_message_member = this.translations["members.members_messages"].error_name_1;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message_member = this.translations["members.members_messages"].error_name_1;
      return;
    }

    if( this.email == '' ){
      this.error_message_member = this.translations["members.members_messages"].error_email_1;
      return;
    }
    
    if( this.email && this.email.length > 191){
      this.error_message_member = this.translations["members.members_messages"].error_surname_2;
      return;
    }

    if( this.mobile == '' ){
      this.error_message_member = this.translations["members.members_messages"].error_email_2;
      return;
    }
    
    if( this.mobile && this.mobile.length > 50){
      this.error_message_member = this.translations["members.members_messages"].error_mobile_2;
      return;
    }


    


    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('comment', this.comment);
    


    this.emailSrv.storePotentialClub( formData).subscribe( (resp:any ) => {

      if( resp.message == 200){
          this.error_message = '';
          this.success_message_member  = this.translations['commun_translations'].data_save_correctly;
          this.member_id = resp.member.id;
      }else if(resp.message == 422) {
          this.error_message_member = this.translations['commun_translations'].data_save_error ;
          this.message_errors_member = resp.errors_text;
      }else if(resp.message == 403) {    
          this.error_message_member = this.translations["members.members_messages"].exist_member  + ' ' + resp.member.name + ' ' + resp.member.surname;
      } else {
          this.error_message_member = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }

    });



  }

}
