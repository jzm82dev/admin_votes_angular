import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { PlayerService } from '../service/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {
  public routes = routes;

  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public address: string = '';
  public club_id:string = '';
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public clubs_list: any = [];      
  public id_player: string = '';
  public player_selected: any;
  
  constructor( public playerSrv: PlayerService, public activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe( (resp:any) => {
      this.id_player = resp.id;
      this.getPlayerSelected();
    })
    this.playerSrv.config().subscribe( (resp:any) => {
      this.clubs_list = resp.clubs;
    })
  }


  getPlayerSelected(){
    this.playerSrv.getPlayer(this.id_player).subscribe( (resp:any) => {
      this.player_selected = resp.player;
      this.name = this.player_selected.name;
      this.surname = this.player_selected.surname;
      this.mobile = this.player_selected.mobile ? this.player_selected.mobile : '';
      this.email = this.player_selected.email ? this.player_selected.email : '';
      this.address = this.player_selected.address ? this.player_selected.address : '';
      this.club_id = this.player_selected.club.id;
      this.image_preview = this.player_selected.avatar;
    });
  }

  loadFile( $event: any ){
    if( $event.target.files[0].type.indexOf('image') < 0){
      alert('Solamente poede ser archivo de tipo imagen')
    }
    this.fileAvatar = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }

  save(){
    this.cleanMessage();
    if( this.name == '' || this.club_id == '' || this.surname == ''){
      this.error_message = 'Los campos name, apellido o apodo y club son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('address', this.address);
    formData.append('imagen', this.fileAvatar);
    formData.append('club_id', this.club_id);

    this.playerSrv.editPlayer(this.id_player, formData).subscribe( (resp: any) => {
      if( resp.message != 200){
        this.error_message = resp.message_text;
      }else{
        this.success_message = 'Jugador actualizado correctamente.';
      }
    })

  }

}
