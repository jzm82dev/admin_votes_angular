import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
  public error = false;
  public translations:any = [];
  public show_spinner: boolean = false;

  form = new FormGroup({
    email: new FormControl('admin@dreamguys.in', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(public auth: AuthService, private router: Router, public translate: TranslateService) {}

  ngOnInit(): void {
    console.log('PASAMOS');
    
    if (localStorage.getItem('authenticated')) {
      //localStorage.removeItem('authenticated');
      if(this.auth.user.club_id){
        console.log('PASAMOS 1');
        this.router.navigate([routes.adminDashboard]);
      }else{
        console.log('PASAMOS 2');
        this.router.navigate([routes.adminDashboard])
      }
    }
    this.initializeLanguage();
  }

  
  initializeLanguage(){
    
    this.translate.use(this.auth.language);
    this.translate.setDefaultLang(this.auth.language);
  
    this.translate.get(['register'])
    .subscribe((resp:any) => {
      this.translations = resp;
    }); 
  }

  loginFormSubmit() {
    this.show_spinner = true;
    if (this.form.valid) {
      this.auth.login( this.form.value.email ? this.form.value.email : '', this.form.value.password ? this.form.value.password : '' ).subscribe(
        (resp: any) =>{
          if(resp){
            setTimeout(() => {
              document.location.reload();
              
            }, 50);
          }else{
            this.error = true;
          }
          
        }, error => {
          console.log(error);
          this.show_spinner = false;
        } 
      );
    }
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}
