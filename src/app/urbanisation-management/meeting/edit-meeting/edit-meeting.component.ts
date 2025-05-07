import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { MeetingService } from '../service/meeting.service';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss']
})
export class EditMeetingComponent {
@ViewChild('closebutton') closebutton: any;
  
  public routes = routes;

  public meeting_id: string = '';
  public meeting_selected: any;
  public name: string = '';
  public urbanisation_id: string = '';
  public date: string = '';
  public questions: any = [];
  public urbanisation_name: string = '';
  public question_selected: any;
  public new_question: string = '';
  public new_coefficient: string = '';

  public isLoaded: boolean = false;
  public user: any;

  public error_message: string = '';
  public message_errors: any = [];
  public error_message_popup:string = '';
  public susccess_message_popup:string = '';

  constructor( public meetingSrv: MeetingService, public activateRoute: ActivatedRoute ){}

  ngOnInit(): void {
    this.user = this.meetingSrv.authSrv.user;
    this.activateRoute.params.subscribe( (resp:any) => {
      this.meeting_id = resp.id;
      this.getMeetingSelected();
    });
  }

  getMeetingSelected(){
    this.meetingSrv.getMeeting(this.meeting_id).subscribe( (resp:any) => {
      this.meeting_selected = resp.meeting;
      this.name = this.meeting_selected.name;
      this.urbanisation_id = this.meeting_selected.urbanisation_id;
      this.date = this.meeting_selected.date;
      this.questions = resp.questions;
      this.urbanisation_name = this.meeting_selected.urbanisation.name;
      this.isLoaded = true;
    });
  }


  
  openPopup(){
    this.new_question = '';
    this.new_coefficient = '';
    this.error_message_popup = '';
    this.susccess_message_popup = '';
    this.message_errors = [];
  }

  closePopup(){
    this.susccess_message_popup = '';
    this.error_message = '';
    this.message_errors = [];
  }

  cleanMessage(){
    this.error_message = '';
  }


  hasPermission( permision: string){
    if(this.user.role.includes('Super-Admin')){
      return true;
    }

    if(this.user.permissions.includes(permision) ){
      return true;
    }

    return false;
  }

  selectQuestion(question: any){
    this.question_selected = question;
  }

  removeQuestion(){
    this.meetingSrv.removeQuestion( this.question_selected.id ).subscribe( (resp:any) => {

      if( resp.message == 200){
        let index = this.questions.findIndex((item:any) => item.id == this.question_selected.id);
        if(index != -1){
          this.questions.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.question_selected = null;
        }
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al eliminar la propiedad los datos.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Ha habido un error al eliminar la propiedad los datos. Consulte con el administrador';
      }
    })
  }


  addQuestion(){
    if( !this.new_question ){
      this.error_message = 'La pregunta es obligatoria';
      return;
    }

    if( this.new_question && this.new_question.length > 300){
      this.error_message = 'La pregunta no puede superar los 300 caracteres';
      return;
    }

    let formData = new FormData();
    formData.append('meeting_id', this.meeting_id);
    formData.append('name',this.new_question);
    
   
    this.meetingSrv.addQuestion( formData ).subscribe( (resp:any) => {
      this.susccess_message_popup = '';
      this.error_message = '';
      this.message_errors = [];
      if( resp.message == 200){
        this.susccess_message_popup = 'Pregunta añadida correctamente';
        this.questions.push(resp.new_question);
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al añadir la pregunta. Inténtalo nuevamente.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Ha habido un error al añadir la pregunta. Consulte con el administrador';
      }
    })

  }
}
