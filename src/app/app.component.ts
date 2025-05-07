import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PadelTools';
  language: any ;
  public language_options: any = ['es', 'en', 'nl'];
  

  constructor( public translate: TranslateService, public authSrv: AuthService){

    this.translate.addLangs(this.language_options);
    const browserLang = this.translate.getBrowserLang();

    if( localStorage.getItem('language') ){
      this.language = localStorage.getItem('language');
    }else{
      //this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
      if( this.language_options.includes(browserLang)){
        this.language = browserLang;
      }else{
        this.language = 'es';
      }
      localStorage.setItem('language', this.language);
    }
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);

  }
   
}