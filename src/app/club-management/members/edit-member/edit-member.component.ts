import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { MembersService } from '../service/members.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent {

  public routes = routes;
  public selectedValue !: string;
  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public member_id:string = '';
  public member_selected: any;

  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';
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

  constructor( public memberSrv: MembersService, public translate: TranslateService, public activateRoute: ActivatedRoute ){}


  ngOnInit(): void {
    this.initializeLanguage();
    this.user = this.memberSrv.authSrv.user;
    this.hasPermission();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.member_id = resp.id;
      this.getMemberSelected();
    });
 }


 initializeLanguage(){
  this.translate.use(this.memberSrv.authSrv.language);
  this.translate.setDefaultLang(this.memberSrv.authSrv.language);

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

  getMemberSelected(){
    this.memberSrv.getMember(this.member_id).subscribe( (resp:any) => {
      this.member_selected = resp.member;
      this.name = this.member_selected.name;
      this.surname = this.member_selected.surname;
      this.mobile = this.member_selected.mobile;
      this.email = this.member_selected.email;
      this.image_preview = this.member_selected.avatar;
      this.isLoaded = true;
    });
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message_member = '';
    this.error_message_member = '';
    this.message_errors_member = [];

  }

  save(){

    if( this.name == '' ){
      this.error_message = this.translations["members.members_messages"].error_name_1;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = this.translations["members.members_messages"].error_name_1;
      return;
    }

    if( this.surname == '' ){
      this.error_message = this.translations["members.members_messages"].error_surname_1;
      return;
    }
    
    if( this.surname && this.surname.length > 191){
      this.error_message = this.translations["members.members_messages"].error_surname_2;
      return;
    }

    /*
    if( this.mobile == '' ){
      this.error_message = this.translations["members.members_messages"].error_mobile_1;
      return;
    }
    
    if( this.mobile && this.mobile.length > 50){
      this.error_message = this.translations["members.members_messages"].error_mobile_2;
      return;
    }

    if( this.email == '' ){
      this.error_message = this.translations["members.members_messages"].error_email_1;
      return;
    }
    
    if( this.email && this.email.length > 191){
      this.error_message = this.translations["members.members_messages"].error_email_2;
      return;
    }

  */

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    // formData.append('mobile', this.mobile);
    // formData.append('email', this.email);
    formData.append('imagen', this.fileAvatar);

    this.memberSrv.updateMember(this.member_id, formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message_member = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })
    
  }




}
