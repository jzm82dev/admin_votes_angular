import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';
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
  public club: any;
  public name: string = '';
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
  public monitor_list: any = [];
  public kind_sport: any = [];

  public pool: any;
  public gym: any;
  public playroom: any;
  public cafe: any;
  public restaurant: any;
  public shop: any;
  public tab_selected: string = 'schedule';
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
              public activateRoute: ActivatedRoute){
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
    
    this.clubDataSrv.getClub(this.hash_club).subscribe( (resp:any )=>{
      this.club = resp.club;
      if(this.club){
        this.name = this.club.name;
        this.mobile = this.club.mobile;
        this.email = this.club.email;
        this.club_manager = this.club.manager;
        this.address = this.club.additional_info.address;
        this.additional_address = this.club.additional_info.additional_address;
        this.description = this.club.additional_info.description;
        this.city = resp.city;
       
        if(resp.club.rrhh){
          this.instagram_link = resp.club.rrhh.instagram_link;
          this.facebook_link = resp.club.rrhh.facebook_link;
          this.twitter_link = resp.club.rrhh.twiter_link;
          this.youtube_link = resp.club.rrhh.youtube_link;
          this.linkedin_link = resp.club.rrhh.linkedin_link;
        }
        console.log('link_ig:',this.instagram_link);
        
        if( this.club.avatar ){
          this.image_preview = this.club.avatar;
        }
        if( this.club.schedule_week_hours.length > 0 ){
          this.schedule_hour_days = this.club.schedule_week_hours;
          this.schedule_hour_days.forEach(element => {
            let day = element.day_id;
            element.day_name = this.translations['commun_translations'][day];
          });
        }
        this.basic_service = resp.all_services['basic_services'];
        this.extra_services = resp.all_services['extra_services'];
        this.formatServices();
        this.monitor_list = resp.monitors;
        this.major_sport_id = resp.major_sport_id;
        this.typeOfSports();
        this.geMajorSportName();
      }
      
    })
    
  }

  openTab( tab:string){
    this.tab_selected = tab;
  }

  formatServices(){
    
    if( this.basic_service.pool == 1){
      this.pool = true;
    }
    if( this.basic_service.gym == 1){
      this.gym = true;
    }
    if( this.basic_service.cafe == 1){
      this.cafe = true;
    }
    if( this.basic_service.restaurant == 1){
      this.restaurant = true;
    }
    if( this.basic_service.playroom == 1){
      this.playroom = true;
    }
    if( this.basic_service.shop == 1){
      this.shop = true;
    }

    this.extra_services.forEach( (service:any) => {
      this.show_sercices.push(service.name);
    });
  }

  typeOfSports(){
    this.kind_sport.push( { id: 0, name: '...'});
    this.kind_sport.push({ id: 1, name: this.translations["club_translations"].sport_1});
    this.kind_sport.push({ id: 2, name: this.translations["club_translations"].sport_2});
    this.kind_sport.push({ id: 3, name: this.translations["club_translations"].sport_3});
    this.kind_sport.push({ id: 4, name: this.translations["club_translations"].sport_4});
    this.kind_sport.push({ id: 5, name: this.translations["club_translations"].sport_5});
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

  
  geMajorSportName(){
    
    switch (this.major_sport_id) {
      case 1:
        this.major_sport_name = 'padel';
        break;
      case 2:
        this.major_sport_name = 'tennis';
        break;
      case 3:
        this.major_sport_name = 'pickleball';
        break;
      case 4:
        this.major_sport_name = 'squash';
        break;
      case 5:
        this.major_sport_name = 'badminton';
        break;
    
      default:
        this.major_sport_name = 'padel';
        break;
    }
    
    
  }

}
