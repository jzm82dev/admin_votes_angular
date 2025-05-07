import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { OwnerService } from '../../owner/service/owner.service';

@Component({
  selector: 'app-voting-question',
  templateUrl: './voting-question.component.html',
  styleUrls: ['./voting-question.component.scss']
})
export class VotingQuestionComponent {


    public routes = routes;
    public isLoaded: boolean = false;
    public user: any;
    public question_id: string = '';
    public question_selected: any;
    public question: string = '';
    public answers: any = [];
    public answer_selected: any;
    public meeting_id: string = '';
    public urbanisation_id: string = '';
    public votes: any = [];
  
    public error_message: string = '';
    public message_errors: any = [];
    public susccess_message: string = '';
    public building_id: string = '...';
    public building: any = [];

    public ownersList: any = [];
    public totalData: number = 0;
  
    public new_answer: string = '';
    public votes_to_save: any = [];

   constructor( public quiestionSrv: QuestionService, public activateRoute: ActivatedRoute, public ownerSrv: OwnerService ){}
  
    ngOnInit(): void {
      this.user = this.quiestionSrv.authSrv.user;
      this.activateRoute.params.subscribe( (resp:any) => {
        this.question_id = resp.id;
        this.getQuestionSelected(); 
        this.getVotesByQuestion();
        this.config();
      });
    }

    
  getQuestionSelected(){
    this.quiestionSrv.getQuestion(this.question_id).subscribe( (resp:any) => {
      this.question_selected = resp.question;
      this.question = this.question_selected.name;
      this.meeting_id = this.question_selected.meeting_id;
      this.answers = resp.answers;
      this.urbanisation_id = resp.urbanisation_id;
      this.getOwners();
      this.isLoaded = true;
    });
  }


  getOwners(){
    this.ownerSrv.listOwnerByBuilding( this.urbanisation_id, this.building_id).subscribe((resp: any) => {
           this.totalData = resp.total;
           this.ownersList = resp.owners;
          // this.lookForVote();
         });
  }

  getVotesByQuestion(){
    this.ownerSrv.listVotesByQuestion( this.question_id).subscribe((resp: any) => {
      this.votes = resp.votes;
    });
  }

  config(){
    this.ownerSrv.config().subscribe((resp: any) => {
      this.building = resp.building;
    });
   }


   lookForVote( answer_id: string, owner_id: string){
    //console.log('answer_id:', answer_id, 'owner_id:', owner_id);
    
    const found = this.votes.find((vote:any) => vote.question_id == this.question_id && vote.answer_id == answer_id && vote.owner_id == owner_id);
    if( found ){
      return true;
    }
    return false;

   }

   cleanMessage(){
    this.error_message = '';
    this.message_errors = [];
    this.susccess_message = '';
  }

   save(){
    this.ownersList.forEach((owner:any) => {
      this.answers.forEach((answer:any)=> {
        var element = document.getElementById('answer_' + owner.id + '_' + answer.id) as HTMLInputElement;
        if( element ){
          if( element.checked  == true){
            this.votes_to_save.push(
              {
                'question_id': this.question_id,
                'owner_id': owner.id,
                'answer_id': answer.id
              }
            )
          }
        }
      })
    });
    
    let formData = new FormData();
    formData.append('building', this.building_id);
    formData.append('votes', JSON.stringify(this.votes_to_save));
    formData.append('meeting_id', this.meeting_id);
    formData.append('question_id', this.question_id);

    this.ownerSrv.storeVotes( formData ).subscribe( (resp:any) => {
      if( resp.message == 200){
         this.votes_to_save = [];
        this.susccess_message = 'Votos guardados correctamente';
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al guardar los votos.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Ha habido un error al guardar los votos. Consulte con el administrador';
      }
    })
  }


}
