import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { RegisterService } from './service/register.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  public routes = routes;
  public CustomControler!: number | string | boolean ;
  public passwordClass  = false;
  public confirmPasswordClass  = false
  public isValidConfirmPassword = false;
  public isAgreePolicy:boolean = true;
  public error = false;
  public error_register: boolean = false;
  public error_message: string = '';
  public translations:any = [];
  public disabledButton: boolean = false;
  public user_email: string = '';
  public registered: boolean = false;
  public user_name: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    agree_policy: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router:Router,private auth: AuthService, public registerSrv: RegisterService, public translate: TranslateService) { }

  ngOnInit(): void {
    let reloadPage = localStorage.getItem("reloadPage");
    if (reloadPage == "yes"){
      localStorage.removeItem("reloadPage");
      document.location.reload();
    }
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


  acceptTermsCond(){
    if(this.form.value.agree_policy == '1'){
      this.isAgreePolicy = true;
    }else{
      this.isAgreePolicy = false;
    }
    
  }

  submit() {
    
    this.disabledButton = true;
    
    if (this.form.value.agree_policy != '1'){
      this.isAgreePolicy = false;
      return;
    }


    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
    } else {
      let formData = new FormData();
      formData.append('name', this.form.value.name ? this.form.value.name : '');
      formData.append('surname', this.form.value.surname ? this.form.value.surname : '');
      formData.append('mobile', this.form.value.mobile ? this.form.value.mobile : '');
      formData.append('email', this.form.value.email ? this.form.value.email : '');
      formData.append('password', this.form.value.password ? this.form.value.password : '')
  
      this.registerSrv.storePlayer( formData ).subscribe( (resp:any ) => {
        if(resp.message == 200){
          this.user_email = this.form.value.email ? this.form.value.email : '';
          this.user_name = this.form.value.name ? this.form.value.name : '';
          setTimeout(() => {
            //document.location.reload();
            this.registered = true;
          }, 1500);
        }else{
          this.error_register = true;
          this.error_message = resp.message_text;
          this.disabledButton = false;
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
