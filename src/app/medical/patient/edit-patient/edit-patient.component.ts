import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent {

  public routes = routes;
  patient_id: any;
  patient_selected: any;

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

  constructor( public activateRoute: ActivatedRoute, public patientSrv: PatientService){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activateRoute.params.subscribe( (resp:any) => {
      this.patient_id = resp.id;
      this.getPatientSelected();
    })
  }

  getPatientSelected(){
    this.patientSrv.getPatient(this.patient_id).subscribe( (resp:any) => {
      this.patient_selected = resp.patient;
      
      this.name = this.patient_selected.name;
      this.surname = this.patient_selected.surname;
      this.email = this.patient_selected.email;
      this.dni = this.patient_selected.dni;
      this.birthday = new Date(this.patient_selected.birthday).toISOString();
      this.mobile = this.patient_selected.mobile;
      this.current_disease = this.patient_selected.current_disease;

      this.family_antecedents = this.patient_selected.antecedent_allergic;
      this.personal_antecedents = this.patient_selected.antecedent_family;
      this.allergic_antecedents = this.patient_selected.antecedent_personal;

      this.name_companion = this.patient_selected.person.name_companion;
      this.surname_companion = this.patient_selected.person.surname_companion;
      this.mobile_companion = this.patient_selected.person.mobile_companion;
      this.relationship_companion = this.patient_selected.person.relationship_companion;
      this.name_responsible = this.patient_selected.person.name_responsible;
      this.surname_responsible = this.patient_selected.person.surname_responsible;
      this.mobile_responsible = this.patient_selected.person.mobile_responsible;
      this.relationship_responsible = this.patient_selected.person.relationship_responsible;

      this.ta = this.patient_selected.ta;
      this.temperature = this.patient_selected.temperature;
      this.fc = this.patient_selected.fc;
      this.fr = this.patient_selected.fr;
      this.weight = this.patient_selected.weight;
      

    })
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }

  save(){
    this.cleanMessage();
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

    this.patientSrv.editPatient(this.patient_id, formData).subscribe( (resp:any)=>{
      this.error_message = '';
      if( resp.message == 200){
        this.success_message = resp.message_text;
      }else{
        this.error_message = 'Ha habido algún error, consulte con el administrador.';
      }
    } )
  }


}
