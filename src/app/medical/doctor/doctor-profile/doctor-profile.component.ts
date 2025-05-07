import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {
  public routes = routes;
  public doctor_selected: any;
  public doctorProfile:any = [];
  public tab_selected: number = 1;
  public id_doctor: any;

  public doctor_name: string = '';
  public doctor_surname: string = '';
  public specialitie_name: string = '';
  public doctor_gender: string = '';
  public doctor_gender_name: string = '';
  public doctor_mobile: string = '';
  public doctor_email: string = '';
  public doctor_education: string = '';
  public doctor_designation: string = '';
  public doctor_address: string = '';
  public appointment_total: number = 0;
  public pending_appointment_total: number = 0;
  public pending_appointment: any = [];
  public appointments: any = [];
  public generate_money: number = 0;
  public doctor_password: string = '';
  public doctor_new_password: string = '';
  public doctor_confirm_new_password: string = '';
  public error_message: string = '';
  public success_message: string = '';
  public appointments_pending: any = [];
  public appointments_treated: any = [];
  
  

  constructor(public doctorSrv : DoctorService, public activateRoute: ActivatedRoute){
  }

  ngOnInit(){

    this.activateRoute.params.subscribe((resp:any) => {
      this.id_doctor = resp.id;
    })    
  
    this.doctorSrv.getProfile(this.id_doctor).subscribe( (resp:any) => {
      console.log(resp)
      this.doctor_selected = resp.doctor;
      this.doctor_name = resp.doctor.name;
      this.doctor_surname = resp.doctor.surname;
      this.specialitie_name = resp.doctor.specialitie.name;
      this.doctor_gender = resp.doctor.gender;
      this.doctor_gender_name = resp.doctor.gender == 1 ? 'Male' : 'Female';
      this.doctor_mobile = resp.doctor.mobile;
      this.doctor_email = resp.doctor.email;
      this.doctor_address = resp.doctor.address;
      this.doctor_education = resp.doctor.education;
      this.doctor_designation = resp.doctor.designation;
      this.appointment_total = resp.total_appointment;
      this.pending_appointment_total = resp.total_pending_appointments;
      this.pending_appointment = resp.pending_appointments;
      this.generate_money = resp.total_money;
      this.appointments = resp.appointments;
      this.appointments_pending = resp.appointments.filter((element:any) => element.status == 1);
      this.appointments_treated =resp.appointments.filter((element:any) => element.status == 2);
    }) 
   
    
  }
  
  tabSeleted(value: number){
    this.tab_selected = value;
  }

  updateSettings(){

    let formData = new FormData();
    

    if( this.doctor_name == '' || this.doctor_surname == ''|| this.doctor_mobile == ''|| this.doctor_email == '' ){
      this.error_message = 'Los campos name, surname, mobile, email son obligatorios';
      return;
    }


    formData.append('name', this.doctor_name);
    formData.append('surname', this.doctor_surname);
    formData.append('mobile', this.doctor_mobile);
    formData.append('email', this.doctor_email);
    formData.append('address', this.doctor_address);

    if( this.doctor_password && this.doctor_password != '1245abcd!' ){
      if( this.doctor_new_password!='' && this.doctor_confirm_new_password != '' && this.doctor_new_password!= this.doctor_confirm_new_password ){
        this.error_message = 'Password y Confirm Password deben ser iguales';
        return;
      }else{
        formData.append('cuurent_password', this.doctor_password);
        formData.append('password', this.doctor_new_password);
      }
    }
    
    this.doctorSrv.updateProfileDoctor(this.id_doctor, formData).subscribe( (resp:any) => {
      if(resp.message == 403){
        this.error_message = resp.message_text
      }else{
        this.success_message = 'Datos actualizado correcamente';
      }
    })
    
  }


  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }


}
