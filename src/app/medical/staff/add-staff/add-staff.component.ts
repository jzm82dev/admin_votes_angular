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
  public birthday: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';
  public rol: any;
  public rolsAdded: any = [];
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  
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
  }
  
  save(){
    if( this.name == '' || this.surname == ''|| this.mobile == ''|| this.email == ''|| this.password == ''|| this.fileAvatar == '' || this.rol == undefined){
      this.error_message = 'Los campos name, surname, mobile, email, rol, password e imagen son obligatorios';
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
   // formData.append('confirm_password', this.confirm_password);
    formData.append('birthday', this.birthday);
    formData.append('gender', this.gender + '');
    formData.append('education', this.education);
    formData.append('designation', this.designation);
    formData.append('address', this.address);
    formData.append('rol', this.rol);
    formData.append('imagen', this.fileAvatar);

    this.staffSrv.storeStaff( formData).subscribe( (resp:any ) => {
      if( resp.message == 200){
        this.error_message = '';
        this.success_message = 'El nuevo usuario ha sido introducido correctamente';
        /*this.name = '';
        this.surname = '';
        this.mobile = '';
        this.password = '';
        this.birthday = '';
        this.gender = 0;
        this.education = '';
        this.designation = '';
        this.rol = '';
        this.fileAvatar = '';*/
      }else{
        this.error_message = resp.message_text;
      }
    });


  }

 
}
