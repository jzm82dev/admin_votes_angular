import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { StaffService } from '../service/staff.service';

interface data {
  value: string ;
}



@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
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
  public message_errors: any = [];
  public hide_buttons:boolean = false;
  
  constructor( public staffSrv: StaffService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.staffSrv.listRoles().subscribe( (resp:any) => {
      this.rolsAdded = resp.roles;
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
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
  }
  
  save(){
    if( this.name == '' || this.surname == ''|| this.mobile == ''|| this.email == ''|| this.password == '' || this.rol == undefined){
      this.error_message = 'Los campos name, surname, mobile, email, rol, password son obligatorios';
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = 'El campo Nombre no puede tener una longitud mayor a 191 caracteres';
      return;
    }

    if( this.surname && this.surname.length > 191){
      this.error_message = 'El campo Apellido no puede tener una longitud mayor a 191 caracteres';
      return;
    }

    if( this.mobile && this.mobile.length > 50){
      this.error_message = 'El campo Teléfono no puede tener una longitud mayor a 50 caracteres';
      return;
    }

    if( this.email && this.email.length > 191){
      this.error_message = 'El campo Email no puede tener una longitud mayor a 191 caracteres';
      return;
    }

    if( this.password && this.password.length > 191){
      this.error_message = 'El campo Contraseña no puede tener una longitud mayor a 50 caracteres';
      return;
    }

    if( this.password != this.confirm_password){
      this.error_message = 'Password y Confirm Password deben ser iguales';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('gender', this.gender + '');
    formData.append('rol', this.rol);
    formData.append('imagen', this.fileAvatar);

    this.staffSrv.storeStaff( formData).subscribe( (resp:any ) => {
      if( resp.message == 200){
        this.success_message = 'El nuevo usuario ha sido introducido correctamente.';
        this.hide_buttons = true;
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al guardar datos del club.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = resp.message_text;
      }
    });


  }

 
}
