import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {

  public routes = routes;

  public appointement_id: string = '';
  public appointment_selected: any;
  public doctor_selected_id: any;
  public hours: any = [];
  public specialities: any = [];
  public error_message: string = '';
  public success_message: string = '';
  public specialitie_id: string = '';
  public hour: string = '';
  public date_appointment: string = '';

  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public dni: string = '';
  public name_companion: string = '';
  public surname_companion: string = '';

  public description: string = '';

  public name_medication: string = '';
  public use_medication: string = '';  
  public medical: any = [];

  constructor( public appointmentSrv: AppointmentService, public activateRoute: ActivatedRoute){ }

  ngOnInit(){
    this.activateRoute.params.subscribe( (resp:any)=>{
      this.appointement_id = resp.id;
      this.getAppointment();
    });
  }


  getAppointment(){
    this.appointmentSrv.getAppointmentAttention(this.appointement_id).subscribe((resp:any)=>{
      console.log(resp)
      this.appointment_selected = resp.appointment;
      this.doctor_selected_id = this.appointment_selected.doctor_id;
      this.name = this.appointment_selected.patient.name;
      this.surname = this.appointment_selected.patient.surname
      this.dni = this.appointment_selected.patient.dni;
      this.mobile = this.appointment_selected.patient.mobile;
      this.name_companion = this.appointment_selected.person_compain.name;
      this.surname_companion = this.appointment_selected.person_compain.surname;
      this.specialitie_id = this.appointment_selected.specialitie_id;
      this.hour = this.appointment_selected.segment_hour.format_segment.hour;
      this.date_appointment = this.appointment_selected.date_appointment_format;
      this.description = resp.appointment_attention.description;
      this.medical = resp.appointment_attention.recipes;
    });
  }

  cleanMessage(){
    this.success_message = '';
    this.error_message = '';
  }

  addMedication(){

    if( !this.name_medication || !this.use_medication){
      this.error_message = 'El nombre y uso del medicamento son obligatorios';
      return;
    }

    let item = {
      name: this.name_medication,
      use: this.use_medication
    };
    
    this.medical.push(item);
    this.name_medication = '';
    this.use_medication = '';

  }

  deleteMedication(i: any){
    this.medical.splice(i, 1);
  }

  save(){

    if(!this.description || this.medical.length == 0){
      this.error_message = 'El diagnóstico y medicamente son obligatorios';
      return;
    }

    let data = {
      'appointement_id': this.appointement_id,
      'patient_id': this.appointment_selected.patient_id,
      'description': this.description,
      'recipes': this.medical
    }

    this.appointmentSrv.updateAttention( this.appointement_id, data).subscribe( (resp:any)=>{
      if(resp.message == 200){
        this.success_message = "Cita actualizada correctamente"
      }else{
        this.error_message = "Error al actualizar cita."
      }
    });

  }

}
