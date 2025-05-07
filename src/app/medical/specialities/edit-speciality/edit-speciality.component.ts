import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialityService } from '../service/speciality.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-edit-speciality',
  templateUrl: './edit-speciality.component.html',
  styleUrls: ['./edit-speciality.component.scss']
})
export class EditSpecialityComponent {

  public routes=routes;
  public idSpeciality: any;
  name: string = '';
  sideBar: any = [];
  permissions: any = [];
  valid_form: boolean = false;
  save_successfully:boolean = false;
  text_validation: string = '';
  text_success: string = '';
  specialitySelected: any;
  public status: number = 1;

  constructor( public activateRoute: ActivatedRoute, public specialicitySrv: SpecialityService){
    this.activateRoute.params.subscribe( (resp:any)=>{
      this.idSpeciality = resp.id;
      this.getSpeciality();
    });
  }

  getSpeciality(){
    this.specialicitySrv.getSpecialicity( this.idSpeciality).subscribe( (resp:any)=> {
      this.specialitySelected = resp.speciality;
      this.name = this.specialitySelected.name; 
      this.status = this.specialitySelected.state;
    });
  }

  cleanMessage(){
    this.text_success = '';
    this.text_validation = '';
  }

  update(){
    let data = {
      name: this.name,
      state: this.status
    };
    
    this.specialicitySrv.updateSpeciality(this.idSpeciality, data).subscribe( (resp:any)=>{
      if( resp.message == 200){
        this.text_success = resp.message_text;
      }else{
        this.text_validation = resp.message_text;
      }
    });
  }



}
