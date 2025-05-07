import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { PlayerService } from '../service/player.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-other-club',
  templateUrl: './other-club.component.html',
  styleUrls: ['./other-club.component.scss']
})
export class OtherClubComponent {

  public routes = routes;
  public other_clubs: any = [];
  public club_member_selected: string = '0'; 
  public club_remove: string = '';

constructor(public playerSrv: PlayerService, public translate: TranslateService){}

    ngOnInit(): void {

      this.translate.setDefaultLang(this.playerSrv.authSrv.language);
      this.translate.use(this.playerSrv.authSrv.language);

      this.playerSrv.getOtherClubs().subscribe( (resp:any) => {
        this.other_clubs = resp.clubs;
      })
    }

    addClub(club_id:string){
      this.playerSrv.regiterClub(club_id).subscribe( (resp:any) => {
        if( resp.message == '200'){
          let index = this.other_clubs.findIndex((item:any) => item.id == club_id);
          if(index != -1){
            this.other_clubs[index].status = 'PENDING';
          }
        }
      })
    }

    cancelClub(club_id:string){
      this.playerSrv.cancelRegiterClub(club_id).subscribe( (resp:any) => {
        if( resp.message == '200'){
          let index = this.other_clubs.findIndex((item:any) => item.id == club_id);
          if(index != -1){
            this.other_clubs[index].status = 'NO_STATUS';
          }
        }
      })
    }


}
