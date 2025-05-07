import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import * as AOS from 'aos';
import { ClubDataService } from '../club-data/services/club-data.service';
import { blogs } from 'src/app/shared/models/models';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  public blogs : Array<blogs> = [];
  
  slides = [
    { 
      img: "assets/home/assets/img/info_carousel.jpg",
      text: "Infomración"
    },
    {
      img: "assets/home/assets/img/league_carousel.jpg",
      text: "Clasificación liga"
    },
    {
      img: "assets/home/assets/img/league_carousel_2.jpg",
      text: "Estadísticas"
    },
    {
      img: "assets/home/assets/img/tournament_carousel.jpg",
      text: "Torneo Draw"
    },
    {
      img: "assets/home/assets/img/tournament_carousel_2.jpg",
      text: "Toreno Liguillas + Playoffs"
    }
  ];


  slideConfig = {"slidesToShow":1 , "slidesToScroll": 1, "autoplay": true, "dots": true};
  
  public routes = routes;
  public searchDataValue: string = '';
  
  public carousel1: any = [];
  public slideIndex: number = 1;
  public loaded: boolean = false;
  public clubs: any = [];
  public translations:any = [];

  public client_name: string = '';
  public client_email: string = ''; 
  public client_club: string = ''; 
  public client_mobile: string = ''; 
  public client_comment: string = ''; 
  public disabledSent: boolean = false;
  public sent_error:boolean = false;
  public sent_ok:boolean = false;
  public show_error_fields: boolean = false;

  constructor( private viewportScroller: ViewportScroller, public clubDataSrv: ClubDataService, 
    public data : DataService, public translate: TranslateService){
  }

  ngOnInit(): void {
    this.blogs = this.data.blogs
    window.addEventListener('scroll', this.scroll, true)
    AOS.init();
    setTimeout(() => {
      this.loaded = true;
    }, 500);
    let formData = new FormData();
    formData.append('search', '');
    this.searchData('');
    this.initializeLanguage();
  }


  initializeLanguage(){
    this.translate.get(['home_page'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
  }




  public searchData(value: string): void {
    //this.teamsList = this.dataSource.filteredData;
    let formData = new FormData();
    formData.append('search', value);

    this.clubDataSrv.findClubs(formData).subscribe( (resp:any) => {
      this.clubs = resp.clubs.data;
    })
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

  sendEmail(){
  
    this.disabledSent = true;
    
    if( this.client_name == '' || this.client_email == '' || this.client_club == '' || 
      this.client_mobile == '' || this.client_comment == '' ){
      this.show_error_fields = true;
    }

    let formData = new FormData();
    formData.append('client_name', this.client_name);
    formData.append('client_email', this.client_email);
    formData.append('client_club', this.client_club);
    formData.append('client_mobile', this.client_mobile);
    formData.append('client_comment', this.client_comment);

    
    this.clubDataSrv.sendEmail(formData).subscribe( (resp:any) => {
      this.show_error_fields = false;
      if(resp.message == 200){
          this.client_name = '';
          this.client_email = ''; 
          this.client_club = ''; 
          this.client_mobile = ''; 
          this.client_comment = ''; 
          this.disabledSent = false;
          this.sent_ok = true;
      }else{
        this.disabledSent = false;
        this.sent_error = true;
      }
    })
  }

}
