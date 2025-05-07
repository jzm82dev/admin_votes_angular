import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ClubService } from '../service/club.service';
import { CourtsService } from 'src/app/club-management/club/courts/service/courts.service';

interface ScheduleDay {
  id: string;
  day_name: string;
  closed: boolean;
  hours: any[]
}

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.scss']
})
export class AddClubComponent {

  public routes = routes;

  public tab_selected: number = 2;
  public name: string = '';
  public club_manager: string = '';
  public mobile: string = '';
  public email: string = '';
  public address: string = '';
  public address_2: string = '';
  public city: string = '';
  public province: string = '';
  public postal_code: string = '';
  public country: string = '';
  public fileAvatar: any;
  public image_preview: any = 'assets/img/img-06.jpg';
  public success_message: string = '';
  public error_message: string = '';
  public open: boolean = false;

  public club: any;
  public opening_time: any;
  public closing_time: any;
  public hours:any = [];
  public schedule_hour_days: ScheduleDay[] = [{id: 'day_1', day_name: 'Lunes', closed: false, hours: []}, {id: 'day_2', day_name: 'Martes', closed: false, hours: []}, 
                                              {id: 'day_3', day_name: 'Miércoles', closed: false, hours: []}, {id: 'day_4', day_name: 'Jueves', closed: false, hours: []},
                                              {id: 'day_5', day_name: 'Viernes', closed: false, hours: []}, {id: 'day_6', day_name: 'Sábado', closed: false, hours: []}, 
                                              {id: 'day_7', day_name: 'Domingo', closed: false, hours: []}];
  public error_message_schedule: string = '';
  public success_message_schedule:string = '';    
  public flag: boolean = true;             
                                  
  constructor( public clubSrv: ClubService, public courtSrv: CourtsService){
  }

  ngOnInit(): void {
    this.clubSrv.config().subscribe( (resp:any)=>{
      console.log(resp)
      this.hours = resp.hours_days;
    });
    this.clubSrv.getClubProfile().subscribe((resp:any) => {
      console.log(resp);
      //this.schedule_hour_days = resp.club_data.schedule_week_hours;
    })
  }

  tabSeleted(value: number){
    this.tab_selected = value;
  }

  deleteHourSchedule(element: any, day: any){

    //this.medical.splice(i, 1);
    let index = this.schedule_hour_days.findIndex((item:any) => item.id == day);
    if(index != -1){
        this.schedule_hour_days[index].hours.splice(element, 1);
    }
    console.log(this.schedule_hour_days)
  }

  loadFile( $event: any ){
    if( $event.target.files[0].type.indexOf('image') < 0){
      alert('Solamente poede ser archivo de tipo imagen')
    }
    this.fileAvatar = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.error_message_schedule = '';
    this.success_message_schedule = '';
  }

  addHourSchedule( day:any ){

    let element = {
      opening_time_id: this.opening_time,
      closing_time_id: this.closing_time,
      opening_time: this.hours[ this.opening_time - 1].format_hour,
      closing_time: this.hours[ this.closing_time - 1].format_hour
    };
    let test: any = [];
    test.push(element);
    
    let index = this.schedule_hour_days.findIndex((item:any) => item.day_name == day);
    if(index != -1){
      this.schedule_hour_days[index].hours.push(element);
    }
    console.log(this.schedule_hour_days);

    this.opening_time = '';
    this.closing_time = '';
    this.schedule_hour_days
  }

  deleteSchedule( index: any){
  }

  
  save(){
    this.cleanMessage();
    if( this.name == '' || this.mobile == '' || this.email == ''){
      this.error_message = 'Los campos name, mobile y email  son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('club_manager', this.club_manager);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('address', this.address);
    formData.append('imagen', this.fileAvatar);

    this.clubSrv.storeDataClub(formData).subscribe( (resp: any) => {
      if( resp.message != 200){
        this.error_message = 'Ha habido un error al guardar club. Consulte con su administrador.';
      }else{
        this.name = '';
        this.club_manager = '';
        this.mobile = '';
        this.email = '';
        this.address = '';
        this.success_message = 'Club guardado correctamente.';
      }
    })
    
  }


  saveScheduleHours(){

    
    this.schedule_hour_days.forEach( (element:any) => {
      element.hours.forEach( (hour:any) => {
        if( hour.opening_time_id >= hour.closing_time_id){
          console.log('entramos en el if')
          this.error_message_schedule = 'Existe alguna hora de entrado mayor que hora de salida.';
          this.flag = false;
          return;
        }
      });
    });


    let formData = new FormData();
    
    
    if( this.flag ){
      formData.append('schedule_hour', JSON.stringify(this.schedule_hour_days));
      
      this.clubSrv.storeWeeklyScheduleClub(formData).subscribe( (resp:any) =>{
        if( resp.message != 200){
          this.error_message_schedule = 'Ha habido un error al guardar club el horario el club.';
        }else{
          this.success_message_schedule = 'Horario del club almacenado correctamente';
        }
      });
    }


  }


}
