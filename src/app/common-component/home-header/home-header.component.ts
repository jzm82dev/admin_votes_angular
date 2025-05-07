import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';

import { TranslateService } from '@ngx-translate/core';
import { ClubService } from 'src/app/league-clubs/club/service/club.service';
import { Location, ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
  public routes = routes;
  public openBox = false;
  public miniSidebar  = false;
  public addClass = false;
  public user: any;
  public language_selected: string = 'en';
  public default_flag_language: any;
  public code_language:string = 'es';
  public active_languages = [
    {
      'name': 'Español',
      'logo': './assets/img/spain.png',
      'code': 'es'
    },
    {
      'name': 'English',
      'logo': 'assets/img/uk.png',
      'code': 'en'
    },
  ];
  public translations:any = [];

  public loaded: boolean = false;

  constructor(public router: Router,private sideBar: SideBarService, private authSrv: AuthService, private location:Location,
      public translate: TranslateService, public clubSrv: ClubService,  private viewportScroller: ViewportScroller) {
    

    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.user = authSrv.user;
    
  }

  scroll = (): void => {

    var navbar = document.getElementById('menu-nav-bar');
    let scrollHeigth;

    if(window.innerWidth < 350){
    scrollHeigth = 150;
    }else if(window.innerWidth < 500 && window.innerWidth > 350){
    scrollHeigth = 250;
    }else if(window.innerWidth < 700 && window.innerWidth > 500){
    scrollHeigth = 350;
    }else if(window.innerWidth < 1000 && window.innerWidth > 700){
    scrollHeigth = 500;
    }else{
      scrollHeigth = 650;
    }

    if(window.scrollY >= scrollHeigth && navbar != null){
        navbar.classList.add('fixed-header'); 
    }else if(window.scrollY < scrollHeigth && navbar != null ){
        navbar.classList.remove('fixed-header');
    } 

}

public scrollToAnchroingPosition(elementId: string): void {
    var elementToScroll  = document.getElementById(elementId);
    if( !elementToScroll ){
      var url = location.href;               //Saving URL without hash.
      location.href = "#";                 //Navigate to the target element.
      history.replaceState(null,'',url);   //method modifies the current history entry.
    }
    this.viewportScroller.scrollToAnchor(elementId);
    var navbar = document.getElementById('menu-nav-bar');
    if(navbar != null){
      navbar.classList.add('fixed-header'); 
    }
    var navbar_mobile = document.getElementById('navbar-menu');

    if(navbar_mobile != null && navbar_mobile.classList.contains('show-menu-mobile')){
      navbar_mobile.classList.remove('show-menu-mobile'); 
    }else if(navbar_mobile != null){
   //   navbar_mobile.classList.add('show-menu-mobile');
    }

}



openMenu(){
 
  var navbar_mobile = document.getElementById('navbar-menu');

  if(navbar_mobile != null && navbar_mobile.classList.contains('show-menu-mobile')){
    navbar_mobile.classList.remove('show-menu-mobile'); 
  }else if(navbar_mobile != null){
    navbar_mobile.classList.add('show-menu-mobile');
  }
}

  
  ngOnInit(): void {

    let path = this.location.path();
    

    let cookieModal = document.querySelector("#modal-cookie");
    let cookieAccepted = localStorage.getItem("cookieAccepted");
    
   

    setTimeout(function (){
        let cookieAccepted = localStorage.getItem("cookieAccepted")
        if (cookieAccepted != "yes" && path.includes('cookie-policy') == false){
            cookieModal?.classList.add("active")
        }
    }, 2000)
    
    this.initializeLanguage();

    window.addEventListener('scroll', this.scroll, true);
    this.translate.addLangs(['es', 'en', 'fr', 'de']);
    this.translate.setDefaultLang(this.clubSrv.authSrv.language);
    this.translate.use(this.clubSrv.authSrv.language);

    
    if(this.clubSrv.authSrv.language == 'es'){
      this.default_flag_language = this.active_languages[1];
    }else{
      this.default_flag_language = this.active_languages[0];
      //this.router.navigate(['/en']);
    }
    
    this.loaded = true;

  }

  initializeLanguage(){
    
    this.translate.get(['home_page'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
  }


  changeLanguage( lang: string){
     
    localStorage.setItem('language', lang);
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    this.initializeLanguage();
    this.clubSrv.authSrv.language = lang;
    
    if( lang == 'es'){
       localStorage.setItem('language', lang);
      this.default_flag_language = this.active_languages[1];
      this.router.navigate(['']);
    }else{
      localStorage.setItem('language', lang);
      this.default_flag_language = this.active_languages[0];
      this.router.navigate(['/en']);
    }
    
  }

  acceptCookie(){
    
    let cookieModal = document.querySelector("#modal-cookie");
    cookieModal?.classList.remove("active")
    localStorage.setItem("cookieAccepted", "yes")
  }
  

}
