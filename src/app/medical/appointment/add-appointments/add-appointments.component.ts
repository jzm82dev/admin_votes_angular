import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { AppointmentService } from '../service/appointment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent {

  public routes = routes;

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

  constructor( public appointmentSrv: AppointmentService){
  }

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appointmentSrv.config().subscribe( (resp: any) => {
      this.hours = resp.hours;
      this.specialities = resp.specialities;
        console.log(resp);
    } )
    
  }


  cleanMessage(){
    this.success_message = '';
    this.error_message = '';
  }

  save(){ 

    if( this.name == '' || this.surname == ''|| this.mobile == ''|| this.dni == ''){
      this.error_message = 'Los campos especialidad, doctor, segmento de hora, nombre, surname y dni del paciente son obligatorios';
      return;
    }

    if( this.name_companion == '' || this.surname_companion == ''){
      this.error_message = 'Los campos name and surname del acompañante son obligatorios';
      return;
    }
    let pipe = new DatePipe('en-US');
    let formData = new FormData();

    let data = {

      'doctor_id' : this.doctor_selected.doctor.id,
      'name': this.name,
      'surname': this.surname,
      'dni': this.dni,
      'mobile': this.mobile,
      'name_companion': this.name_companion,
      'surname_companion': this.surname_companion,
      'specialitie_id' : this.specialitie_id,
      'doctor_schedule_join_hour_id' : this.segmet_hour_selected,
      'date_appointment': pipe.transform(this.date_appointment, 'yyyy-MM-dd'),//this.date_appointment,
      'total_amount': this.total_amount,
      'amount_add': this.amount_add,
      'amount_prepayment': this.amount_prepayment,
      'payment_method': this.payment_method
      

    }

    this.appointmentSrv.registerAppointment(data).subscribe( (resp:any) => {
      if(resp.message == 200){
        this.success_message = 'La cita médica se registró correctamente';
      }
    } )

  }

  filter(){
    let pipe = new DatePipe('en-US');


    this.aviable_doctors = [];
    this.available_segmets = [];
    this.doctor_selected = null;
    let data = {
      'hour': this.hour,
      'specialitie_id': this.specialitie_id,
      'date_appointment': pipe.transform(this.date_appointment, 'yyyy-MM-dd')
    }
    console.log(data)
    this.appointmentSrv.filter(data).subscribe((resp:any)=>{
      console.log(resp);
      this.aviable_doctors = resp.doctors;

    });
  }

  countAvailablesHours( segments:any ){
    console.log('entramos')
    let segmentAvialables = [];
    segmentAvialables = segments.filter((item:any) => item.isAvailable == true)
    return segmentAvialables.length;
  }

  showAvialablesHours( doctor: any ){
    console.log('entramos')
    this.doctor_selected = doctor;
    console.log(this.doctor_selected.doctor.id)
    this.available_segmets = doctor.segments;
  }

  findPaptient(){
    console.log('entramos')
   this.appointmentSrv.findPatient(this.dni).subscribe( (resp:any) => {
      console.log(resp);
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
    console.log('entramos')
    this.name = '';
        this.surname = '';
        this.mobile = '';
        this.dni = '';
  }

  selectSegment(segment: any){
    console.log('entramos')
    this.segmet_hour_selected = segment.id;
    console.log(segment)
  }
}
