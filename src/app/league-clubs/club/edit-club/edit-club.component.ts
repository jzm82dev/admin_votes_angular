import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ClubService } from '../service/club.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent {

  public routes = routes;
  public name: string = '';
  public club_manager: string = '';
  public mobile: string = '';
  public email: string = '';
  public address: string = '';
  public fileAvatar: any;
  public image_preview: any = 'assets/img/img-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public id_club: string = '';
  public club_selected: any;

  constructor( public clubSrv: ClubService, public activateRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( (resp:any) => {
      this.id_club = resp.id;
      this.getClubSelected();
    })
  }


  getClubSelected(){
    this.clubSrv.getClub(this.id_club).subscribe( (resp:any) => {
      this.club_selected = resp.club;
      this.name = this.club_selected.name
      this.club_manager = this.club_selected.club_manager
      this.mobile = this.club_selected.mobile
      this.email = this.club_selected.email
      this.address = this.club_selected.address
      this.image_preview = this.club_selected.avatar;
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
    if( this.name == '' || this.mobile == '' || this.email == ''){
      this.error_message = 'Los campos name, mobile y email  son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('club_manager', this.club_manager);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('address', this.address);
    formData.append('imagen', this.fileAvatar);

    this.clubSrv.editClub(this.id_club, formData).subscribe( (resp:any) => {
      if( resp.message != 200){
        this.error_message = 'Ha habido un error al guardar club. Consulte con su administrador.';
      }else{
        this.success_message = 'Club actualizado correctamente.';
      }
    })
  }

}
