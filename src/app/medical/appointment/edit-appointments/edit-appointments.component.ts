import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { DatePipe } from '@angular/common';
import { routes } from 'src/app/shared/routes/routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
  styleUrls: ['./edit-appointments.component.scss']
})
export class EditAppointmentsComponent {
  public routes = routes;

  public appointement_id :any;
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

  public total_amount: number = 0;
  public amount_add: number = 0;
  public amount_prepayment: number = 0;
  public payment_method: string = '';

  public aviable_doctors: any = [];
  public aviable_hours: any = [];
  public available_segmets: any = [];
  public doctor_selected: any;
  public segmet_hour_selected: any;
  public radio: any;
  public cont: number = 0;

  constructor( public appointmentSrv: AppointmentService, public activateRoute: ActivatedRoute){ }

  ngOnInit(){
    this.activateRoute.params.subscribe( (resp:any)=>{
      this.appointement_id = resp.id;
      this.getAppointment();
    });


    this.appointmentSrv.config().subscribe( (resp: any) => {
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    });
  
  }


  getAppointment(){
    this.appointmentSrv.getAppointment(this.appointement_id).subscribe((resp:any)=>{
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
      this.total_amount = this.appointment_selected.amount;
      this.amount_prepayment = this.appointment_selected.total_paid;
      this.payment_method = '1'; //this.appointment_selected.
      this.radio = this.appointment_selected.doctor_schedule_join_hour_id;
      this.segmet_hour_selected = this.appointment_selected.doctor_schedule_join_hour_id;
      this.filter();
    });
  }

  cleanMessage(){
    this.success_message = '';
    this.error_message = '';
  }

  update(){ 

    if( this.specialitie_id == '' || !this.date_appointment || this.doctor_selected.doctor.id == '' || !this.total_amount){
      this.error_message = 'Los campos especialidad, doctor, total de pago y segmento de hora son obligatorios';
      return;
    }
   
    if( new Date(this.date_appointment).getTime() != new Date(this.appointment_selected.date_appointment_format).getTime()){
      if(!this.segmet_hour_selected){
        this.error_message = 'La hora es obligatoria';
        return;
      }
    }

    let pipe = new DatePipe('en-US');

    let data = {
      'doctor_id' : this.doctor_selected.doctor.id,
      'specialitie_id' : this.specialitie_id,
      'doctor_schedule_join_hour_id' : this.segmet_hour_selected,
      'date_appointment': pipe.transform(this.date_appointment, 'yyyy-MM-dd'),//this.date_appointment,
      'total_amount': this.total_amount,
    }

    
    this.appointmentSrv.updateAppointment(this.appointement_id, data).subscribe( (resp:any) => {
      if(resp.message == 200){
        this.success_message = 'La cita médica se actualizó correctamente';
      }else{
        this.error_message = resp.message_text;
      }
    });

  }

  filter(){
    let pipe = new DatePipe('en-US');

    this.aviable_doctors = [];
    this.available_segmets = [];
    this.doctor_selected = null;
    let data = {
      'hour': this.hour,
      'specialitie_id': this.specialitie_id,
      'date_appointment': pipe.transform(this.date_appointment, 'yyyy-MM-dd')//this.date_appointment
    }
    let doctor_read;
    this.appointmentSrv.filter(data).subscribe((resp:any)=>{
      doctor_read = resp.doctors;
      doctor_read.forEach( (element:any) => {
        let doctorElement = {
          doctor: element.doctor,
          segments: element.segments,
          aviables: element.segments.length,
          doctor_selected: element.doctor.id == this.doctor_selected_id ? true : false
        }
        this.aviable_doctors.push(doctorElement);
        console.log(this.aviable_doctors)
      });
      let filter_doctor =  this.aviable_doctors.filter((item:any) => item.doctor.id == this.doctor_selected_id);
      if(filter_doctor.length > 0){
        this.doctor_selected = filter_doctor[0];
        this.doctor_selected.segments.forEach( (element: any) => {
          element.selected = element.id == this.radio ? true : false;
        });
        this.available_segmets = this.doctor_selected.segments;
      }
    });
  }

  isDoctorSelected( doctor:any ){
    console.log('entamods isDoctorSelected')
    if(doctor && this.doctor_selected){
      if(this.doctor_selected.doctor.id == doctor.doctor.id){
        return true;
      }
    }
    return false;
  }

  isSegmentSelected( segment:any ){
    console.log('entamods isSegmentSelected')
    if(this.radio == segment.id){
      return true;
    }
    return false;
  }

  countAvailablesHours( segments:any ){
    this.cont++;
    let segmentAvialables = [];
    segmentAvialables = segments.filter((item:any) => item.isAvailable == true)
    return segmentAvialables.length;
  }

  showAvialablesHours( doctor: any ){
    this.doctor_selected = doctor;
    this.available_segmets = doctor.segments;
  }


  findPaptient(){
   this.appointmentSrv.findPatient(this.dni).subscribe( (resp:any) => {
      if(resp.message=='403'){
        this.name = '';
        this.surname = '';
        this.mobile = '';
        this.dni = '';
      }else{
        this.name = resp.name;
        this.surname = resp.surname;
        this.mobile = resp.mobile;
        this.dni = resp.dni;
      }
   })
  }

  resetClient(){
    this.name = '';
        this.surname = '';
        this.mobile = '';
        this.dni = '';
  }

  selectSegment(segment: any){
    this.segmet_hour_selected = segment.id;
  }


  onDateChange(event: any){
    this.aviable_doctors = [];
    this.available_segmets = [];
    this.doctor_selected = null;
  }
}
