import { Component } from '@angular/core';
import { UrbanisationService } from '../../urbanisation/services/urbanisation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meeting-info',
  templateUrl: './meeting-info.component.html',
  styleUrls: ['./meeting-info.component.scss']
})
export class MeetingInfoComponent {

  public meeting_id: string = '';
  public meeting_selected: any;
  public hash:string = '';
  public name: string = '';
  public urbanisation_id: string = '';
  public date: string = '';
  public questions: any = [];
  public urbanisation_name: string = '';
  public question_selected: any;
  public new_question: string = '';
  public new_coefficient: string = '';
  public isLoaded: boolean = false;
  public tab_selected: string = '';
  public final_result: any = [];

  constructor( public urbanisationSrv: UrbanisationService, public activateRoute: ActivatedRoute ){}
  
    ngOnInit(): void {
     this.activateRoute.params.subscribe( (resp:any) => {
        this.meeting_id = resp.id;
        this.getMeetingSelected();
      });
    }


     getMeetingSelected(){
      this.urbanisationSrv.getMeeting(this.meeting_id).subscribe( (resp:any) => {
        this.meeting_selected = resp.meeting;
        this.name = this.meeting_selected.name;
        this.urbanisation_id = this.meeting_selected.urbanisation_id;
        this.date = this.meeting_selected.date;
        this.questions = resp.questions;
        this.urbanisation_name = this.meeting_selected.urbanisation.name;
        this.isLoaded = true;
        this.questions = resp.questions;
        this.hash = this.meeting_selected.urbanisation.hash;
        this.getFinalReport();
      });
    }

    


  getFinalReport(){
    this.urbanisationSrv.getFinalReport(this.meeting_id).subscribe( (resp:any) => {
      this.final_result = resp.final_result;
      console.log(this.final_result);
    });
  }

  

  openTab( tab: string){

  }

}
