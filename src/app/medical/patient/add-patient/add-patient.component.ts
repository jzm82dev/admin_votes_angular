import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { PatientService } from '../service/patient.service';
interface data {
  value: string ;
}
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  public routes = routes;

  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public dni: string = '';
  public birthday: string = '';
  public mobile: string = '';
  public family_antecedents: string = '';
  public personal_antecedents: string = '';
  public allergic_antecedents: string = '';

  public name_companion: string = '';
  public surname_companion: string = '';
  public mobile_companion: string = '';
  public relationship_companion: string = '';
  public name_responsible: string = '';
  public surname_responsible: string = '';
  public mobile_responsible: string = '';
  public relationship_responsible: string = '';
  
  public ta: number = 0;
  public temperature: number = 0;
  public fc: number = 0;
  public fr: number = 0;
  public weight: number = 0;
  public current_disease: string = '';

  public error_message: string = '';
  public success_message: string = '';
   
  constructor( public patientSrv: PatientService ){
  }
  
  save(){
    
    if( this.name == '' || this.surname == ''|| this.mobile == ''|| this.dni == ''){
      this.error_message = 'Los campos name, surname, móvil y dni son obligatorios';
      return;
    }

    if( this.name_companion == '' || this.surname_companion == ''){
      this.error_message = 'Los campos name and surname del acompañante son obligatorios';
      return;
    }

    let formData = new FormData();
    
    // PERSONAL DATA
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append('dni', this.dni);

    if(this.email){
      formData.append('email', this.email);
    }
    
    if(this.birthday){
      formData.append('birhtday', this.birthday);
    }

    if(this.current_disease){
      formData.append('current_disease', this.current_disease);
    }


    // ANTECENDETS  
    if(this.family_antecedents){
      formData.append('antecedent_family', this.family_antecedents);
    }

    if(this.personal_antecedents){
      formData.append('antecedent_personal', this.personal_antecedents);
    }

    if(this.allergic_antecedents){
      formData.append('antecedent_allergic', this.allergic_antecedents);
    }

    // PATIENTS COMPANIOS
    if( this.name_companion == '' || this.surname_companion == ''){
      this.error_message = 'Los campos name, surname del acompañante son obligatorios';
      return;
    }

    formData.append('name_companion', this.name_companion);
    formData.append('surname_companion', this.surname_companion);


    if(this.mobile_companion){
      formData.append('mobile_companion', this.mobile_companion);
    }

    if(this.relationship_companion){
      formData.append('relationship_companion', this.relationship_companion);
    }

    if(this.name_responsible){
      formData.append('name_responsible', this.name_responsible);
    }

    if(this.surname_responsible){
      formData.append('surname_responsible', this.surname_responsible);
    }

    if(this.mobile_responsible){
      formData.append('mobile_responsible', this.mobile_responsible);
    }

    if(this.relationship_responsible){
      formData.append('relationship_responsible', this.relationship_responsible);
    }


    // VITAL SIGNS
    if(this.ta){
      formData.append('ta', this.ta.toString());
    }

    if(this.temperature){
      formData.append('temperature', this.temperature.toString());
    }

    if(this.fc){
      formData.append('fc', this.fc.toString());
    }

    if(this.fr){
      formData.append('fr', this.fr.toString());
    }

    if(this.weight){
      formData.append('weight', this.weight.toString());
    }

    

    this.patientSrv.storePatient(formData).subscribe( (resp:any) => {
      if( resp.message == 403){
        this.error_message = resp.messsage_text;
      }else{
        this.success_message = 'El paciente ha sido registrado correctamente.'
        this.name = '';
        this.surname = '';
        this.email = '';
        this.mobile = '';
        this.dni = '';
        this.birthday = '';
        this.mobile = '';
        this.family_antecedents = '';
        this.personal_antecedents = '';
        this.allergic_antecedents = '';
        this.current_disease = '';
        this.ta = 0;
        this.temperature = 0;
        this.fc = 0;
        this.fr = 0;
        this.weight = 0; 
      }
      
    })


  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }

}
