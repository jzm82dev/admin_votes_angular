import { Component } from '@angular/core';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { routes } from 'src/app/shared/routes/routes';
import { ClubService } from '../service/club.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {


  public routes = routes;
  editor!: Editor;
  html:any = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public user: any;  
  public can_edit:boolean = false;    
  public language: string = 'en'; 
  public club: any;
  public translations:any = [];
  public description:string =  "";
  public success_message: string = '';
  public error_message: string = '';
  public message_errors: any = [];

  form = new FormGroup({
    description: new FormControl(
      { value: this.description, disabled: false },
      Validators.required()
    ),
  });

  constructor( public clubSrv: ClubService, public translate: TranslateService){
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.initializeLanguage();
    
    this.user = this.clubSrv.authSrv.user;
    this.hasPermission();

    this.clubSrv.getClubDescriptionData().subscribe((resp:any) => {
      
      if( resp.message == 200 ){
        this.form.reset({description: resp.description});
      }
    })
  }

  initializeLanguage(){
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


  ngOnDestroy(): void {
    this.editor.destroy();
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
  }

  saveDescription(){
    
    let formData = new FormData();
    formData.append('description', this.form.value.description ? this.form.value.description : '');
    console.log(this.form.value.description)
    
    this.clubSrv.updateDescriptionClub(formData).subscribe( (resp: any) => {
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
