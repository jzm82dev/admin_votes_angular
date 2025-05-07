import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { PlayerService } from '../service/player.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent {

    @ViewChild('closebutton') closebutton: any;
    public routes = routes;
    public my_clubs: any = [];
    public club_member_selected: string = '0'; 
    public club_remove: string = '';
  
    constructor(public playerSrv: PlayerService, public translate: TranslateService){
      
    }

    ngOnInit(): void {
      this.translate.setDefaultLang(this.playerSrv.authSrv.language);
      this.translate.use(this.playerSrv.authSrv.language);
      
      this.playerSrv.getMyClubs().subscribe( (resp:any) => {
        console.log(resp.clubs);
        this.my_clubs = resp.clubs;
      })
      
    }

    selectClubMember(id: string, club_name: string){
      this.club_remove = club_name;
      this.club_member_selected = id;
    }

    removeClubMember(){
      this.playerSrv.deleteMember(this.club_member_selected).subscribe( (resp:any) => {
        if( resp.message == 200){
          let index = this.my_clubs.findIndex((item:any) => item.club_user_id == this.club_member_selected);
          if(index != -1){
            this.my_clubs.splice(index, 1);
            this.closebutton.nativeElement.click();
            this.club_member_selected = '0';
          }
        }else{
          console.log(resp)
        }
      })
    }

}
