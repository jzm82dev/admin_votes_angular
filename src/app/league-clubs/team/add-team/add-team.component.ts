import { Component, ViewChild } from '@angular/core';
import { TeamService } from '../service/team.service';
import { routes } from 'src/app/shared/routes/routes';
import { Route } from '@angular/router';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebuttonAddPLayer') closebuttonAddPLayer: any;

  public routes = routes;
  public name: string = '';
  public club_id: string = '';
  public category_id: string = '';
  public league_id: string = '';
  public description: string = '';

  public id_team: string = '';
  
  public club_list: any = [];
  public category_list: any = [];
  public league_list: any = [];

  public success_message: string = '';
  public error_message: string = '';
  public player_team_list: any = [];
  
  // Modal data
  public player_id: string = '';
  public text_modal_invalid: string = '';
  public text_modal_success: string = '';
  public player_list: any = [];
  public playerSelected: any = [];
  public player_name_delected: string = '';
  public player_id_delected: string = '';

  constructor( public teamSrv: TeamService){
  }

  ngOnInit(): void {
    this.teamSrv.config().subscribe( (resp:any) => {
      this.club_list = resp.clubs;
      this.league_list = resp.leagues;
    })
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.text_modal_invalid = '';
    this.text_modal_success = '';
  }

  changeLeague( leagueId:any){
    let data = {
      'league_id' : leagueId
    };
    this.teamSrv.getCategoriesByLeague(data).subscribe( (resp: any) => {
      this.category_list = resp.categories;
    })
  }

  save(){
    this.cleanMessage();
    
    if( this.name == '' || this.club_id == '' || this.category_id == ''){
      this.error_message = 'Los campos name, club, categoría y liga son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('club_id', this.club_id);
    formData.append('category_id', this.category_id);
    formData.append('league_id', this.league_id);

    this.teamSrv.storeTeam(formData).subscribe( (resp:any) => {
      if( resp.message != 200){
        this.error_message = 'Ha habido un error al guardar equipo. Consulte a su administrador.';
      }else{
        this.success_message = 'Equipo guardado correctamente. No olvides añadir los jugadores ahora al equipo';
        this.id_team = resp.id_team;
        console.log('Team id: ',this.id_team )
        this.getPossiblesPlayers();
      }
    })
    
  }

  getPossiblesPlayers(){
    let data = {
      'club_id': this.club_id
    };

    this.teamSrv.getPossiblePlayers(data).subscribe( (resp:any) => {
      this.player_list = resp.players.data;
      console.log('possibles:',this.player_list)
     })
  }

  
  addPlayerTeam(){
    let formData = new FormData();
    formData.append('player_selected', JSON.stringify(this.playerSelected));
    formData.append('id_team', this.id_team);

    this.teamSrv.addPlayers(formData).subscribe( (resp: any) => {
      if( resp.message != 200){
        this.text_modal_invalid = 'Error al añadir jugadores al equipo. Consulte a su administrador.';
      }else{
        this.playerSelected.forEach((player:any) => {
          this.player_team_list.push(player);
        });
        this.closebuttonAddPLayer.nativeElement.click();
        this.text_modal_success = 'Jugadores añadidos al equipo';
        this.getPossiblesPlayers();
      }
    })
  }

  selectPlayers( player: any){
    let index = this.playerSelected.findIndex((element:any) => element.id == player.id  );
    if(index != -1){
      this.playerSelected.splice(index, 1);
    }else{
      this.playerSelected.push(
        { 
          "id": player.id,
          "name": player.name,
          "surname": player.surname,
          "avatar": player.avatar,
          "mobile": player.mobile
        }
      )
    }
  }

  deletePlayerSelected(){

    let formData = new FormData();
    formData.append('id_player', this.player_id_delected);
    formData.append('id_team', this.id_team);

    this.teamSrv.deletePlayers(formData).subscribe( (resp:any) => {
      if( resp.message == 200){
        let index = this.player_team_list.findIndex((item:any) => item.id == this.player_id_delected);
        if(index != -1){
          this.player_team_list.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.getPossiblesPlayers();
        }
      }
    })
  

  }


  selectPLayer(player:any ){
    this.player_name_delected = player.name;
    this.player_id_delected = player.id
  }


}
