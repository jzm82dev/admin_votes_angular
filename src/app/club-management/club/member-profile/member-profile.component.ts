import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { MembersService } from '../../members/service/members.service';
import { PlayerService } from 'src/app/player-management/service/player.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent {
  public routes = routes;
  public user_id: string = '';
  public club_user_id: string = '';
  public selectedValue !: string;
  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public member_selected: any;
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';
  public isLoaded: boolean = false;
  public status_member:string = '';
  public birthday: string = '';
  public gender: number = 0;
  public gender_name: string = '';
  public translations:any = [];

  constructor(  public activateRoute: ActivatedRoute, public memberSrv: MembersService, 
                public playerSrv: PlayerService, public translate: TranslateService){ }

  ngOnInit(): void {
    this.initializeLanguage();
    this.activateRoute.params.subscribe( (resp:any) => {
      if(resp.user_id){
        this.user_id = resp.user_id;
        this.club_user_id = resp.club_user_id;
        this.getMemberData();
      }
    })
  }

  initializeLanguage(){
   
    this.translate.use(this.playerSrv.authSrv.language);
    this.translate.setDefaultLang(this.playerSrv.authSrv.language);

    this.translate.get(['commun_translations', 'members', 'members.members_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
  }

  getMemberData(){
    this.playerSrv.getPlayerData(this.user_id).subscribe( (resp:any) => {
      this.member_selected = resp.member;
      this.name = this.member_selected.name;
      this.surname = this.member_selected.surname;
      this.mobile = this.member_selected.mobile;
      this.email = this.member_selected.email;
      this.image_preview = this.member_selected.avatar;
      this.status_member = this.member_selected.status;
      this.birthday = new Date(this.member_selected.birthday).toISOString();
      this.gender = this.member_selected.gender;
      if(this.gender == 1){
        this.gender_name = this.translations['members'].male;
      }else if(this.gender == 2){
        this.gender_name = this.translations['members'].female;
      }
      this.isLoaded = true;
    });
  }


  public accept( club_user_id:string ){
    this.playerSrv.acceptClubPlayer(club_user_id).subscribe( (resp:any) => {
      if(resp.message == 200){
        setTimeout(() => {
          document.location.reload();
        }, 50);
      }
    })
    
  }

  public cancel( club_user_id:string  ){
    this.playerSrv.cancelClubPlayer(club_user_id).subscribe( (resp:any) => {
      if(resp.message == 200){
        this.status_member = 'CANCELED';
      }
    })
  }
  

}
