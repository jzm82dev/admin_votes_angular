import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { RegisterClubService } from './service/register-club.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.component.html',
  styleUrls: ['./register-club.component.scss']
})
export class RegisterClubComponent {
  public routes = routes;
  public CustomControler!: number | string | boolean ;
  public passwordClass  = false;
  public confirmPasswordClass  = false
  public isValidConfirmPassword = false;
  public error = false;
  public message_error: string = '';
  public translations:any = [];
  public isAgreePolicy:boolean = true;
  public disabledButton: boolean = false;
  public show_spinner: boolean = false;

  public registered: boolean = false;
  public club_email: string = '';
  public club_name: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]), 
    mobile: new FormControl('', [Validators.required ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    code: new FormControl('', ),
    agree_policy: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router:Router,private auth: AuthService, public registerSrv: RegisterClubService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    
    if (localStorage.getItem('authenticated')) {
        this.router.navigate([routes.adminDashboard])
    }
    this.initializeLanguage();
  }


  initializeLanguage(){
    
    this.translate.use(this.registerSrv.authSrv.language);
    this.translate.setDefaultLang(this.registerSrv.authSrv.language);
  
    this.translate.get(['register'])
    .subscribe((resp:any) => {
      this.translations = resp;
    }); 
  }


  cleanMessage(){
    this.message_error = '';
  }

  acceptTermsCond(){
    if(this.form.value.agree_policy == '1'){
      this.isAgreePolicy = true;
    }else{
      this.isAgreePolicy = false;
    }
    
  }


  submit() {
    
    this.cleanMessage();

    this.disabledButton = true;
    this.show_spinner = true;
    
    if (this.form.value.agree_policy != '1'){
      this.isAgreePolicy = false;
      return;
    }

    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
      this.show_spinner = false;
    } else {
      let formData = new FormData();
      formData.append('name', this.form.value.name ? this.form.value.name : '');
      formData.append('mobile', this.form.value.mobile ? this.form.value.mobile : '');
      formData.append('email', this.form.value.email ? this.form.value.email : '');
      formData.append('password', this.form.value.password ? this.form.value.password : '');
      formData.append('code', this.form.value.code ? this.form.value.code : '')
  
      this.registerSrv.storeClub( formData ).subscribe( (resp:any ) => {
        if(resp.message == 200){
          this.club_email = this.form.value.email ? this.form.value.email : '';
          this.club_name = this.form.value.name ? this.form.value.name : ''; 
          setTimeout(() => {
            //document.location.reload();
            this.registered = true;
            this.show_spinner = false;
          }, 1500);
        }else{
          this.disabledButton = false;
          this.show_spinner = false;
          this.message_error = resp.message_text;
        }
        
      });
    
    }

  }


  register(){}

  passwordFunc(){
    this.passwordClass = !this.passwordClass
  }

  
  confirmPasswordFunc(){
    this.confirmPasswordClass = !this.confirmPasswordClass
  }
}
