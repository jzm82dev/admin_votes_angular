import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data/data.service';
import { patientProfile } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent {

  public routes = routes;
  public patientProfile:any = [];
  public tab_selected: number = 1;

  public id_patient: any;
  public patient_selected: any;
  public patient_name: string = '';
  public patient_surname: string = '';
  public patient_email: string = '';
  public patient_mobile: string = '';
  public patient_birthday: string = '';
  public patient_current_disease: string = '';
  public patient_dni: string = '';
  public patient_fc: string = '';
  public patient_fr: string = '';
  public patient_temperature: string = '';
  public patient_weight: string = '';
  public patient_antecedent_allergic: string = '';
  public patient_antecedent_family: string = '';
  public patient_antecedent_personal: string = '';
  public appointments: any = [];
  public pending_appointments: any = [];

  public error_message: string = '';
  public success_message: string = '';

  constructor(public patientSrv : PatientService, public activateRoute: ActivatedRoute){ 

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((resp:any) => {
      this.id_patient = resp.id;
      console.log(this.id_patient)
    });
    
    this.patientSrv.getPatientProfile(this.id_patient).subscribe( (resp:any) => {
      this.patient_selected = resp.patient;
      this.patient_name = this.patient_selected.name;
      this.patient_surname = this.patient_selected.surname;
      this.patient_email = this.patient_selected.email;
      this.patient_mobile = this.patient_selected.mobile;
      this.patient_birthday = this.patient_selected.birthday;
      this.patient_current_disease = this.patient_selected.current_disease;
      this.patient_dni = this.patient_selected.dni;
      this.patient_fc = this.patient_selected.fc;
      this.patient_fr = '90';//this.patient_selected.fr;
      this.patient_temperature = this.patient_selected.temperature;
      this.patient_weight = this.patient_selected.weight;
      this.patient_antecedent_allergic = this.patient_selected.antecedent_allergic;
      this.patient_antecedent_family = this.patient_selected.antecedent_family;
      this.patient_antecedent_personal = this.patient_selected.antecedent_personal;
      this.appointments = resp.appointments;
      this.pending_appointments = resp.pending_appointments.data;
    });
  }
  
  tabSeleted(value: number){
    this.tab_selected = value;
  }

  

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }

}