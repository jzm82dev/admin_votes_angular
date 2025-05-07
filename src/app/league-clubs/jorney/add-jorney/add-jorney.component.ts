import { Component } from '@angular/core';
import { JorneyService } from '../service/jorney.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-add-jorney',
  templateUrl: './add-jorney.component.html',
  styleUrls: ['./add-jorney.component.scss']
})
export class AddJorneyComponent {

  public routes = routes;

  public name: string = '';
  public date_planned: string = '';
  public description: string = '';

  public success_message: string = '';
  public error_message: string = '';
  public save_ok: boolean = false;
  public id_new_journey: string = '';

  constructor( public jorneySrv: JorneyService){}

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }

  save(){
    this.cleanMessage();

    if( this.name == '' || this.date_planned == '' ){
      this.error_message = 'Los campos nombre y fecha prevista son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('date', this.date_planned);

    this.jorneySrv.storeJorney(formData).subscribe( (resp:any) => {
      if( resp.message != 200){
        this.error_message = 'Ha habido un error al guardar club. Consulte con su administrador.';
      }else{
        this.save_ok = true;
        //this.name = '';
        //this.description = '';
        //this.date_planned = '';
        this.id_new_journey = resp.id_journey;
        this.success_message = 'Jornada añadida correctamente.';
      }
    })


  }

}
