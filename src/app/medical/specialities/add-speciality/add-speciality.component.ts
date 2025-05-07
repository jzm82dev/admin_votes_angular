import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { SpecialityService } from '../service/speciality.service';


@Component({
  selector: 'app-add-speciality',
  templateUrl: './add-speciality.component.html',
  styleUrls: ['./add-speciality.component.scss']
})
export class AddSpecialityComponent {
  
  public routes = routes;
  name: string = '';
  sideBar: any = [];
  permissions: any = [];
  valid_form: boolean = false;
  save_successfully:boolean = false;
  text_validation: string = '';
  text_success: string = '';

  

  constructor( public specialitySrv: SpecialityService){
    console.log('Entramos en el constructor de AddSpecialityComponent')
  }

  cleanMessage(){
    this.text_success = '';
    this.text_validation = '';
  }

  save(){
    this.text_success = '';
    this.text_validation = '';
    if( this.name == ''){
      console.log('entramos')
      this.text_validation = 'El campo name es obligatorio';
      return;
    }
   
    let data = {
      name: this.name
    };
    this.specialitySrv.storeSpeciality( data ).subscribe( (resp:any) => {
      if(resp.message == 200){
        this.text_success = resp.message_text;
      }else{
        this.text_validation = resp.message_text;
      }
    })
  }
}
