import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute } from '@angular/router';

interface WeekDay {
  name: string;
  colour: string;
}

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent {

  public routes = routes;
  public selectedValue !: string  ;
  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public password: string = '';
  public confirm_password: string = '';
  public birthday: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';
  public rol: any;
  public rolsAdded: any = [];
  public specialitiesAdded: any = [];
  public hourDays:any = [];
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public specialitie_id: any;
  public WeekDays: WeekDay[] = [{name: 'Monday', colour: 'table-primary'}, {name: 'Tuesday', colour: 'table-secondary'}, {name: 'Wednesday', colour: 'table-success'}, 
                                {name: 'Thursday', colour: 'table-danger'}, {name: 'Friday', colour: 'table-warning'}];
  public hoursSelected: any = [];
  public allHourSelectDay: any = [];
  public doctorId: any;
  public doctorSelected: any;
  public specilitie_id: any;
  
  
  constructor( public doctorSrv: DoctorService, public activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((resp:any) => {
      this.doctorId = resp.id;
    })

    this.doctorSrv.config().subscribe( (resp:any)=>{
      this.rolsAdded = resp.roles;
      this.specialitiesAdded = resp.specialities;
      this.hourDays = resp.hours_days;
    });

    this.doctorSrv.getDoctor(this.doctorId).subscribe( (resp :any) => {
      this.doctorSelected = resp.doctor;
      console.log(this.doctorSelected);
      this.name = this.doctorSelected.name;
      this.surname = this.doctorSelected.surname;
      this.mobile = this.doctorSelected.mobile;
      this.education = this.doctorSelected.education;
      this.designation = this.doctorSelected.designation;
      this.email = this.doctorSelected.email;
      this.address = this.doctorSelected.address;
      this.rol = this.doctorSelected.role.id;
      this.email = this.doctorSelected.email;
      this.gender = this.doctorSelected.gender;
      this.password = '';
      this.hoursSelected = this.doctorSelected.hoursSelected;
      this.specialitie_id = this.doctorSelected.specialitie_id;
      // this.confirm_password = '';
      this.birthday = new Date(this.doctorSelected.birthday).toISOString();
    })
    
  }

  loadFile( event: any ){
    if( event.target.files[0].type.indexOf('image') < 0){
      alert('solamente poede ser archivo de tipo imagen')
    }
    this.fileAvatar = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
    console.log(event);
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }
  
  addHourItem( hour:any, day: any, item: any){
    console.log(item)
    let index = this.hoursSelected.findIndex((element:any) => /*element.hour == hour &&*/ element.day == day && element.hour_start == item.hour_start && element.hour_end == item.hour_end );
    if(index != -1){
      this.hoursSelected.splice(index, 1);
    }else{
      this.hoursSelected.push(
        { 
          "id": item.id,
          "day" : day,
          "hour": hour,
          "hour_start": item.hour_start,
          "hour_end": item.hour_end
        }
      )
    }
    console.log(this.hoursSelected);
  }

  removeRange( day: any, hour: any, hour_start: any, hour_end: any){
    let range = {
      "day" : day,
      "hour": hour,
      "hour_start":hour_start,
      "hour_end": hour_end
    }
    let index = this.hoursSelected.findIndex((element:any) => /*element.hour == hour &&*/ element.day == day && element.hour_start == hour_start && element.hour_end == hour_end );
    if(index != -1){
      this.hoursSelected.splice(index, 1);
    }
  }

  addRange( id:any, day: any, hour: any, hour_start: any, hour_end: any){
    let range = {
      "id" : id,
      "day" : day,
      "hour": hour,
      "hour_start":hour_start,
      "hour_end": hour_end
    }
    let index = this.hoursSelected.findIndex((element:any) => /*element.hour == hour &&*/ element.day == day && element.hour_start == hour_start && element.hour_end == hour_end );
    if(index == -1){
      this.hoursSelected.push(range);
    }
  }

  addAllHours( hours_day:any, day:any, items:any  ){
    let element = {
      "day": day,
      "hour": hours_day.hour,
      "ranges": items
    };
    let index = this.allHourSelectDay.findIndex((item: any) => item.day == day && item.hour == hours_day.hour);
    if(index != -1){
      this.allHourSelectDay.splice(index, 1);
      items.forEach((hours: any) => {
        this.removeRange(day, hours_day.format_hour, hours.hour_start, hours.hour_end );
      });
    }else{
      this.allHourSelectDay.push(element);
      hours_day.items.forEach((hours: any) => {
        this.addRange(hours.id, day, hours_day.format_hour, hours.hour_start, hours.hour_end );
      });
    }
    console.log( this.hoursSelected);

  }

  isCheckedHour( hour:any, day: any, item: any){
    let index = this.hoursSelected.findIndex((element:any) => /*element.hour == hour &&*/ element.day == day && element.hour_start == item.hour_start && element.hour_end == item.hour_end );
    if(index != -1){
      return true;
    }else{
      return false;
    }
  }

  save(){
    
    if( this.name == '' || this.surname == ''|| this.mobile == ''|| this.email == '' || this.rol == undefined){
      this.error_message = 'Los campos name, surname, mobile, email, rol, password e imagen son obligatorios';
      return;
    }

    if( this.password != this.confirm_password){
      this.error_message = 'Password y Confirm Password deben ser iguales';
      return;
    }

    if( this.hoursSelected.length == 0){
      this.error_message = 'Necesitas seleccionar mínimo un horario';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    if(this.password != ''){
      formData.append('password', this.password);
    }
   // formData.append('confirm_password', this.confirm_password);
    formData.append('birthday', this.birthday);
    formData.append('gender', this.gender + '');
    formData.append('education', this.education);
    formData.append('designation', this.designation);
    formData.append('address', this.address);
    formData.append('rol', this.rol);
    formData.append('specialitie_id', this.specialitie_id);
    formData.append('avatar', this.fileAvatar);
    // Format Schedule
    let hourSchedule: any = [];
    this.WeekDays.forEach((day:any) => {
      let day_hour = this.hoursSelected.filter((element:any) => element.day == day.name);
      hourSchedule.push({
        day_name: day.name,
        children: day_hour
      });
    })
    formData.append('schedule_hour', JSON.stringify(hourSchedule));


    this.doctorSrv.updateDoctor(this.doctorId, formData).subscribe( (resp:any ) => {
      console.log(resp)
      if( resp.message == 200){
        this.error_message = '';
        this.success_message = 'El doctor ha sido actualizado correctamente';
      }else{
        this.error_message = resp.message_text;
      }
    });

  }

}
