import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-verify-wait-screen',
  templateUrl: './verify-wait-screen.component.html',
  styleUrls: ['./verify-wait-screen.component.scss']
})
export class VerifyWaitScreenComponent {
  public routes = routes;
  public passwordClass  = false;
  public token: string = '';
  public email: string = '';
  public isValidToken: boolean = true;
  public passwordChanged: boolean = false;
  public error = false;
  public club_name: string = '';
  public translations:any = [];
  public loaded: boolean = false;
  public show_spinner: boolean = true;

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  constructor(public router : Router, public activateRoute: ActivatedRoute, public clubDataSrv: ClubDataService, 
              public translate: TranslateService, public auth: AuthService){
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    
    if (localStorage.getItem('authenticated')) {
       //localStorage.removeItem('authenticated');
      if(this.auth.user.club_id){
        this.router.navigate([routes.club]);
      }else{
        this.router.navigate([routes.adminDashboard])
      }
    }
    this.initializeLanguage();
    
    this.activateRoute.params.subscribe( (resp: any) => {
      this.token = resp.token;
      this.clubDataSrv.verifyUser(this.token).subscribe( (resp:any) => {
        if( resp.isTokenActive){
          this.loaded = true;
          this.show_spinner = false;
          this.email = resp.email;
          this.club_name = resp.club_name;
        }else{
          this.isValidToken = false;
        }
       console.log(resp);
       
      })
      
    });
    
  }

  initializeLanguage(){
    
    this.translate.use(this.auth.language);
    this.translate.setDefaultLang(this.auth.language);
  
    this.translate.get(['register'])
    .subscribe((resp:any) => {
      this.translations = resp;
    }); 
  }

  
  direction(){
    this.router.navigate([routes.login])
  }
  togglePassword(){
    this.passwordClass = !this.passwordClass
  }

  loginFormSubmit() {
    
    if (this.form.valid) {
      this.auth.login( this.email ? this.email : '', this.form.value.password ? this.form.value.password : '' ).subscribe(
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
        } 
      );
    }
  }

}
