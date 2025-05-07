import { Component, ViewChild } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent {

  @ViewChild('closebutton') closebutton: any;

  public routes = routes;
  public isLoaded: boolean = false;
  public user: any;
  public question_id: string = '';
  public question_selected: any;
  public question: string = '';
  public answers: any = [];
  public answer_selected: any;
  public meeting_id: string = '';

  public error_message: string = '';
  public message_errors: any = [];
  public error_message_popup:string = '';
  public susccess_message_popup:string = '';

  public new_answer: string = '';

 constructor( public quiestionSrv: QuestionService, public activateRoute: ActivatedRoute ){}

  ngOnInit(): void {
    this.user = this.quiestionSrv.authSrv.user;
    this.activateRoute.params.subscribe( (resp:any) => {
      this.question_id = resp.id;
      this.getQuestionSelected();
    });
  }


  getQuestionSelected(){
    this.quiestionSrv.getQuestion(this.question_id).subscribe( (resp:any) => {
      this.question_selected = resp.question;
      this.question = this.question_selected.name;
      this.meeting_id = this.question_selected.meeting_id;
      this.answers = resp.answers;
      this.isLoaded = true;
    });
  }

  openPopup(){
    this.new_answer = '';
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

  
  selectAnswer(answer: any){
    this.answer_selected = answer;
  }

  removeAnswer(){
    this.quiestionSrv.removeAnswer( this.answer_selected.id ).subscribe( (resp:any) => {

      if( resp.message == 200){
        let index = this.answers.findIndex((item:any) => item.id == this.answer_selected.id);
        if(index != -1){
          this.answers.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.answer_selected = null;
        }
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al eliminar la respuest.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Ha habido un error al eliminar la respuesta. Consulte con el administrador';
      }
    })
  }


  addAnswer(){
    if( !this.new_answer ){
      this.error_message = 'La respuesta es obligatoria';
      return;
    }

    if( this.new_answer && this.new_answer.length > 191){
      this.error_message = 'La pregunta no puede superar los 191 caracteres';
      return;
    }

    let formData = new FormData();
    formData.append('question_id', this.question_id);
    formData.append('name',this.new_answer);
    
   
    this.quiestionSrv.addAnswer( formData ).subscribe( (resp:any) => {
      this.susccess_message_popup = '';
      this.error_message = '';
      this.message_errors = [];
      if( resp.message == 200){
        this.susccess_message_popup = 'Respuesta añadida correctamente';
        this.answers.push(resp.new_answer);
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al añadir la pregunta. Inténtalo nuevamente.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Ha habido un error al añadir la pregunta. Consulte con el administrador';
      }
    })
      

  }


}
