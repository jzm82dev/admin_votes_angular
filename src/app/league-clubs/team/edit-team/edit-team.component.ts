import { Component, ViewChild } from '@angular/core';
import { TeamService } from '../service/team.service';
import { routes } from 'src/app/shared/routes/routes';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../player/service/player.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent {
  public routes = routes;
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebuttonAddPLayer') closebuttonAddPLayer: any;
  

  public id_team: string = '';
  public team_selected: any;

  public name: string = '';
  public club_id: string = '';
  public category_id: string = '';
  public league_id: string = '';
  public description: string = '';
  public player_team_list: any = [];
  
  public club_list: any = [];
  public category_list: any = [];
  public league_list: any = [];

  public success_message: string = '';
  public error_message: string = '';
  
  // Modal data
  public player_id: string = '';
  public text_modal_invalid: string = '';
  public text_modal_success: string = '';
  public player_list: any = [];
  public playerSelected: any = [];
  public player_name_delected: string = '';
  public player_id_delected: string = '';

  constructor( public teamSrv: TeamService, public activateRoute: ActivatedRoute, public playerSrv: PlayerService){
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( (resp:any) => {
      this.id_team = resp.id;
      this.getTeamSelected();
    })

    this.teamSrv.config().subscribe( (resp:any) => {
      this.club_list = resp.clubs;
      this.league_list = resp.leagues;
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

  getTeamSelected(){
      this.teamSrv.getTeam(this.id_team).subscribe( (resp:any) => {
      this.team_selected = resp.team;
      this.player_team_list = this.team_selected.players; 
      this.name = this.team_selected.name;
      this.club_id = this.team_selected.club.id;
      this.category_id = this.team_selected.category.id;
      this.league_id = this.team_selected.league.id;
      this.description = this.team_selected.description;
      this.changeLeague(this.league_id);
      this.getPossiblesPlayers();
    });
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
    
    if( this.name == '' || this.club_id == '' || this.category_id == ''){
      this.error_message = 'Los campos name, club y categoría son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('club_id', this.club_id);
    formData.append('category_id', this.category_id);
    formData.append('league_id', this.league_id);

    this.teamSrv.editTeam(this.id_team, formData).subscribe( (resp:any) => {
      if( resp.message != 200){
        this.error_message = 'Ha habido un error al guardar equipo. Consulte a su administrador.';
      }else{
        this.success_message = 'Equipo actualizado correctamente.';
      }
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
