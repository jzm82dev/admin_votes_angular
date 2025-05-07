import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register/service/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {


    public routes = routes;
    public CustomControler!: number | string | boolean ;
    public passwordClass  = false;
    public confirmPasswordClass  = false
    public isValidConfirmPassword = false;
    public error = false;
    public token: string = '';
    public user_email: string = '';
    public isValidToken: boolean = true;
    public passwordChanged: boolean = false;

    form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    get f() {
      return this.form.controls;
    }

    constructor(private router:Router,public clubDataSrv: ClubDataService, public registerSrv: RegisterService, 
      public activateRoute: ActivatedRoute) { }
    
    ngOnInit(): void {
      this.activateRoute.params.subscribe( (resp: any) => {
        this.token = resp.token;
        this.clubDataSrv.getUserByToken(this.token).subscribe( (resp:any) => {
          if( resp.isTokenActive){
            this.user_email = resp.email;
          }else{
            this.isValidToken = false;
          }
        })
        
      });
    }


    
  submit() {
    
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
    } else {
      this.isValidConfirmPassword = false;
      let formData = new FormData();
      formData.append('password', this.form.value.password ? this.form.value.password : '');
      formData.append('email', this.user_email);
      formData.append('token', this.token);
  
      this.clubDataSrv.updatePasswordUser(formData).subscribe( (resp:any) => {
        if(resp.message == 200){
          this.passwordChanged = true;
        }
        
       /* if(resp.message == 200){
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
            } 
          );
        } */
        
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
