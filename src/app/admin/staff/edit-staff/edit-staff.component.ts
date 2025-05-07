import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { StaffService } from '../service/staff.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent {

  public routes = routes;
  public selectedValue !: string  ;
  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public password: string = '';
  public confirm_password: string = '';
  public gender: number = 1;
   public rol: any;
  public rolsAdded: any = [];
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public idStaffSelected: number = 0;
  public staffSelected: any ;
  public message_errors: any = [];


  constructor( public activateRoute: ActivatedRoute, public staffSrv: StaffService){
   
    this.staffSrv.listRoles().subscribe( (resp:any) => {
      this.rolsAdded = resp.roles;
    });
    this.activateRoute.params.subscribe( (resp:any) => {   
      this.idStaffSelected = resp.id;
      console.log(this.idStaffSelected);
      this.getStaff();
    })
  }



  loadFile( $event: any ){
    if( $event.target.files[0].type.indexOf('image') < 0){
      alert('Solamente poede ser archivo de tipo imagen')
    }
    this.fileAvatar = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
    console.log(this.fileAvatar);
  }

  showImage(){
    this.fileAvatar = this.staffSelected.avata;
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
  }

  getStaff(){
    let pipe = new DatePipe('en-US');
    this.staffSrv.getStaff( this.idStaffSelected).subscribe( (resp:any) => {
      console.log(resp);
      this.staffSelected = resp.user;
      this.name = this.staffSelected.name;
      this.surname = this.staffSelected.surname;
      this.mobile = this.staffSelected.mobile;
      this.email = this.staffSelected.email;
      this.rol = this.staffSelected.role.id;
      this.email = this.staffSelected.email;
      this.gender = this.staffSelected.gender;
      this.password = '';
     // this.confirm_password = '';
      this.image_preview = this.staffSelected.avatar;
    })
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
  }

  save(){

    this.cleanMessage();

    if( this.name == '' || this.surname == ''|| this.mobile == ''|| this.email == ''){
      this.error_message = 'Los campos name, surname, mobile, email son obligatorios';
      return;
    }
    if( this.password != '' || this.confirm_password != ''){
      if( this.password != this.confirm_password){
        this.error_message = 'Password y Confirm Password deben ser iguales';
        return;
      }
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append("email", this.email);
  //  formData.append('password', this.password);
   // formData.append('confirm_password', this.confirm_password);
    formData.append('gender', this.gender + '');
    formData.append('rol', this.rol);
    formData.append('imagen', this.fileAvatar);

    this.staffSrv.editStaff( this.idStaffSelected, formData).subscribe( (resp:any ) => {
      if( resp.message == 200){
        this.success_message = 'El usuario ha sido actualizado correctamente';
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al guardar datos del usuario.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = resp.message_text;
      }

      
    });
  }
  

}
