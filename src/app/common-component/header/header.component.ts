import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';

import { TranslateService } from '@ngx-translate/core';
import { ClubService } from 'src/app/league-clubs/club/service/club.service';
import { ViewportScroller } from '@angular/common';
import { PlayerService } from 'src/app/player-management/service/player.service';
import { URL_BACKEND, URL_SERVICIOS } from 'src/app/config/config';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('openMemberMenu') openMemberMenu: any;
  public routes = routes;
  public openBox = false;
  public miniSidebar  = false;
  public addClass = false;
  public user: any;
  public language_selected: string = 'en';
  public pending_members: any = [];
  public default_flag_language: string = 'assets/img/user-06.jpg';
  public user_img: string = 'assets/img/user-06.jpg';
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
    {
      'name': 'Deutsch',
      'logo': 'assets/img/germany.png',
      'code': 'en'
    },
    {
      'name': 'Français',
      'logo': 'assets/img/france.png',
      'code': 'en'
    },
  ];
   

  constructor(public router: Router,private sideBar: SideBarService, private authSrv: AuthService, 
      public translate: TranslateService, public clubSrv: ClubService,  public playerSrv: PlayerService,
      private viewportScroller: ViewportScroller) {
    

    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.user = authSrv.user;
    if( authSrv.user.avatar ){
      this.user_img = URL_BACKEND + '/storage/' + authSrv.user.avatar;
    }
    
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

    this.viewportScroller.scrollToAnchor(elementId);
    var navbar = document.getElementById('menu-nav-bar');
    if(navbar != null){
      navbar.classList.add('fixed-header'); 
    }
    var navbar_mobile = document.getElementById('navbar-menu');

    if(navbar_mobile != null && navbar_mobile.classList.contains('show-menu-mobile')){
      navbar_mobile.classList.remove('show-menu-mobile'); 
    }else if(navbar_mobile != null){
      navbar_mobile.classList.add('show-menu-mobile');
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
    window.addEventListener('scroll', this.scroll, true);
    this.translate.addLangs(['es', 'en', 'fr', 'de']);
    this.translate.setDefaultLang(this.clubSrv.authSrv.language);
    this.translate.use(this.clubSrv.authSrv.language);

    let index = this.active_languages.findIndex((item:any)=>item.code == this.clubSrv.authSrv.language );
      if( index != -1){
        this.default_flag_language = this.active_languages[index].logo;
      }
      if(this.user.role.includes('Admin-Club') || this.user.role.includes('Club-Employee')){
        this.clubSrv.getPendingMembers().subscribe( (resp:any) => {
        this.pending_members = resp.pending_members;
        });
      }
  }
  

  switchLang(lang: string) {
    localStorage.setItem('language', lang);
    console.log('lang->',this.language_selected);
    this.translate.use(this.language_selected);
    this.translate.setDefaultLang(this.language_selected);
    document.location.reload();
  }

  changeLanguage(lang:any){
    if( lang != this.clubSrv.authSrv.language){
      localStorage.setItem('language', lang);
      this.translate.use(lang);
      this.translate.setDefaultLang(lang);
      document.location.reload();
    }
    console.log(event);
  }


  getRoleName(){
    return this.user.role[0];
  }

  openBoxFunc() {
    this.openBox = !this.openBox;
    /* eslint no-var: off */
    var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
    if (this.openBox) {
      mainWrapper.classList.add('open-msg-box');
    } else {
      mainWrapper.classList.remove('open-msg-box');
    }
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
    
      this.addClass = !this.addClass;
      /* eslint no-var: off */
      var root = document.getElementsByTagName( 'html' )[0];
      /* eslint no-var: off */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var sidebar:any = document.getElementById('sidebar')

      if (this.addClass) {
        //root.classList.add('menu-opened');
        sidebar.classList.add('opened');
      }
      else {
        //root.classList.remove('menu-opened');
        sidebar.classList.remove('opened');
      }

      if( localStorage.getItem('isMobileSidebar')){
        sidebar.classList.add('menu-opened');
      }else{
        sidebar.classList.remove('menu-opened');
      }
  

    }

    public logout(){
      this.authSrv.logout();
    }


    public accept( club_user_id:string ){
      this.playerSrv.acceptClubPlayer(club_user_id).subscribe( (resp:any) => {
        if(resp.message == 200){
          let index = this.pending_members.findIndex((item:any) => item.club_user_id == club_user_id);
          if(index != -1){
            this.pending_members.splice(index, 1);
            if( this.pending_members.length > 0 ){
              this.openMemberMenu.nativeElement.click();
            }
          }
        }
        
      })
      
    }

    public cancel( club_user_id:string  ){
      this.playerSrv.cancelClubPlayer(club_user_id).subscribe( (resp:any) => {
        if(resp.message == 200){
         let index = this.pending_members.findIndex((item:any) => item.club_user_id == club_user_id);
          if(index != -1){
            this.pending_members.splice(index, 1);
            if( this.pending_members.length > 0 ){
              this.openMemberMenu.nativeElement.click();
            }
          }
        }
        
      })
      
    }

  }
