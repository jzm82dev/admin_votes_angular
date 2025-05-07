import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { OwnerService } from '../../owner/service/owner.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-votes-result',
  templateUrl: './votes-result.component.html',
  styleUrls: ['./votes-result.component.scss']
})
export class VotesResultComponent {


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

    public total_votes: number = 0;
    public result: any = [];
    public result_datails: any = [];

  constructor( public quiestionSrv: QuestionService, public activateRoute: ActivatedRoute, public ownerSrv: OwnerService ){}
  
    ngOnInit(): void {
      this.user = this.quiestionSrv.authSrv.user;
      this.activateRoute.params.subscribe( (resp:any) => {
        this.question_id = resp.id;
        this.getQuestionSelected(); 
        this.getVotesByQuestion();
      });
    }

    getResult(){
      this.ownerSrv.resultVotesByQuestion( this.question_id).subscribe((resp: any) => {
        //this.votes = resp.votes;
        console.log(resp);
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

    getVotesByQuestion(){
      this.ownerSrv.resultVotesByQuestion( this.question_id).subscribe((resp: any) => {
        this.result = resp.result;
        this.total_votes = resp.total_votes;
        this.result_datails = resp.result_datails;
      });
    }

    getOwners(){
      this.ownerSrv.listOwnerByBuilding( this.urbanisation_id, this.building_id).subscribe((resp: any) => {
             this.totalData = resp.total;
             this.ownersList = resp.owners;
           });
    }


    generatePdf(){
    
      const options = {
        margin: 0.5,
        filename: 'pregunta_' + this.question_id + '.pdf',
        image: {
        type: 'jpeg',
        quality: 500
        },
        html2canvas: {
        scale: 1
        },
        jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait'
        }
      }
      
      const element = document.getElementById('question_result');
     
      
      html2pdf().from(element).set(options).save();
      
     
    }
  
}
