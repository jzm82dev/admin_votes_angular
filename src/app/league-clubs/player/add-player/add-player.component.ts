import { Component } from '@angular/core';
import { PlayerService } from '../service/player.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent {
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
  public save_ok: boolean = false;                                      

  constructor( public playerSrv: PlayerService){}

  ngOnInit(): void {
    this.playerSrv.config().subscribe( (resp:any) => {
      this.clubs_list = resp.clubs;
    })
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
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
  
  save(){
    this.cleanMessage();

    if( this.name == '' || this.surname == '' || this.club_id == ''){
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

    this.playerSrv.storePlayer(formData).subscribe( (resp: any) => {
      if( resp.message != 200){
        this.error_message = resp.message_text;
      }else{
        this.save_ok = true;
        this.name = '';
        this.surname = '';
        this.mobile = '';
        this.email = '';
        this.address = '';
        this.fileAvatar = '';
        this.club_id = '';
        this.success_message = 'Jugador guardado correctamente.';
      }
    })
    
  }

}
