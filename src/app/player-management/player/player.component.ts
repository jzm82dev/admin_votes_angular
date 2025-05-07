import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { TranslateService } from '@ngx-translate/core';
import { PlayerService } from '../service/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
 public routes = routes;
  public selectedValue !: string  ;
  public player:any;
  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public password: string = '';
  public confirm_password: string = '';
  public gender: string = '0';
  public rol: any;
  public rolsAdded: any = [];
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public message_errors: any = [];
  public hide_buttons:boolean = false;
  public translations:any = [];
  public birthday: string = '';


  constructor( public playerSrv: PlayerService, public translate: TranslateService){}

  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initializeLanguage();

    this.playerSrv.getProfile( 1 ).subscribe( (resp:any) => {
      this.player = resp.player;
      this.name = this.player.name;
      this.surname = this.player.surname;
      this.mobile = this.player.mobile;
      this.email = this.player.email;
      this.password = '';
      this.gender = this.player.gender.toString();
      this.birthday = new Date(this.player.birthday).toISOString();
      if( this.player.avatar ){
        this.image_preview = this.player.avatar;
      }
    })
  }


  initializeLanguage(){
   
    this.translate.use(this.playerSrv.authSrv.language);
    this.translate.setDefaultLang(this.playerSrv.authSrv.language);

    this.translate.get(['commun_translations', 'members', 'members.members_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
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
    this.message_errors = [];
  }
  
  save(){
    
    this.cleanMessage();

    if( !this.name || !this.surname || !this.mobile || !this.email ){
      this.error_message = this.translations["members.members_messages"].error_data_mandatory;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = this.translations["members.members_messages"].error_name_2;
      return;
    }

    if( this.surname && this.surname.length > 191){
      this.error_message = this.translations["members.members_messages"].error_surname_2;
      return;
    }

    if( this.email && this.email.length > 191){
      this.error_message = this.translations["members.members_messages"].error_mobile_2;
      return;
    }

    if( this.mobile && this.mobile.length > 50){
      this.error_message = this.translations["members.members_messages"].error_mobile_2;
      return;
    }

    if( this.password != this.confirm_password){
      this.error_message = this.translations["members.members_messages"].no_match_password;
      return;
    }


    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('imagen', this.fileAvatar);
    formData.append('gender', this.gender);
    formData.append('birthday', this.birthday);
    if(this.password != ''){
      formData.append('password', this.password);
    }

    this.playerSrv.editPlayer(formData).subscribe( (resp: any) => {
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
