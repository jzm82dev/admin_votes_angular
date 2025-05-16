import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';
import { UrbanisationService } from 'src/app/public/urbanisation/services/urbanisation.service';
import { routes } from 'src/app/shared/routes/routes';

interface ScheduleDay {
  day_id: string;
  day_name: string;
  closed: boolean;
  hours: any[]
}

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.scss']
})
export class ClubInfoComponent {

  public loaded: boolean = true;
  public routes = routes;
  public urbanisation: any;
  public name: string = '';
  public president: string = '';
  public club_manager: string = '';
  public mobile: string = '';
  public email: string = '';
  public city: string = '';

  public address: string = '';
  public additional_address: string = '';
  public postal_code: string = '';
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';

  public schedule_hour_days: ScheduleDay[] = [];
  public opening_time: any;
  public closing_time: any;
  public hours:any = [];
  public success_message: string = '';
  public translations:any = [];

  public basic_service: any;
  public extra_services:any = [];
  public show_sercices: any = [];
  public meets_list: any = [];
  public kind_sport: any = [];

  public pool: any;
  public gym: any;
  public playroom: any;
  public cafe: any;
  public restaurant: any;
  public shop: any;
  public tab_selected: string = 'meets';
  public hash_club: string = '';
  public today: any;
  public major_sport_id: number = 0;
  public major_sport_name: string = '';
  public description: string = '';

  public instagram_link: string = '';
  public twitter_link: string = '';
  public facebook_link: string = '';
  public youtube_link: string = '';
  public linkedin_link: string = '';

  constructor(public clubDataSrv: ClubDataService,  public translate: TranslateService, private location:Location, 
              public activateRoute: ActivatedRoute, public urbanisationSrv: UrbanisationService){
  }

  ngOnInit(): void {
    
    let pipe = new DatePipe('en-US');
    this.today = pipe.transform(new Date(), 'yyyy-MM-dd');
    this.activateRoute.params.subscribe( (resp: any) => {
      this.hash_club = resp.hash;
      if( resp.tab ){
        this.tab_selected =  resp.tab;
      }
      this.initializeLanguage();
    });
    
    let path = this.location.path();
    if (path.includes('club/booking')) {
      this.tab_selected = 'booking';
    }
    if (path.includes('club/leagues')) {
      this.tab_selected = 'leagues';
    }
    if (path.includes('club/tournaments')) {
      this.tab_selected = 'tournaments';
    }
    
    this.urbanisationSrv.getUrbanisation(this.hash_club).subscribe( (resp:any )=>{
      this.urbanisation = resp.urbanisation;
      console.log(this.urbanisation);
      
      if(this.urbanisation){
        this.name = this.urbanisation.name;
        this.president = this.urbanisation.president;
        this.email = this.urbanisation.email;
        this.club_manager = this.urbanisation.manager;
        this.address = this.urbanisation.address;
        this.city = resp.city;
       
        
        
    
       
        this.meets_list = resp.meets;
        
       
      }
      
    })
    
  }

  openTab( tab:string){
    this.tab_selected = tab;
  }

  


  initializeLanguage(){
   
   // this.translate.use(this.clubSrv.authSrv.language);
    this.translate.setDefaultLang('es');

    this.translate.get(['commun_translations', 'club_translations.services', 'club_translations.schedule', 'club_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.schedule_hour_days = [
          {day_id: 'day_1', day_name: this.translations['commun_translations'].day_1, closed: false, hours: []}, 
          {day_id: 'day_2', day_name: this.translations['commun_translations'].day_2, closed: false, hours: []}, 
          {day_id: 'day_3', day_name: this.translations['commun_translations'].day_3, closed: false, hours: []}, 
          {day_id: 'day_4', day_name: this.translations['commun_translations'].day_4, closed: false, hours: []},
          {day_id: 'day_5', day_name: this.translations['commun_translations'].day_5, closed: false, hours: []}, 
          {day_id: 'day_6', day_name: this.translations['commun_translations'].day_6, closed: false, hours: []}, 
          {day_id: 'day_7', day_name: this.translations['commun_translations'].day_7, closed: false, hours: []}
        ];
      }); 
  }



}
