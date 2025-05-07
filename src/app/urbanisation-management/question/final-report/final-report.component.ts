import { Component } from '@angular/core';
import { MeetingService } from '../../meeting/service/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.scss']
})
export class FinalReportComponent {


  public routes = routes;
  public isLoaded: boolean = false;
  public user: any;
  public meeting_id: string = '';
  public meeting_selected: any;

  public name: string = '';
  public urbanisation_id: string = '';
  public date: string = '';
  public questions: any = [];
  public urbanisation_name: string = '';
  public final_result: any = [];


  
  constructor( public meetingSrv: MeetingService, public activateRoute: ActivatedRoute ){}
  
  ngOnInit(): void {
    this.user = this.meetingSrv.authSrv.user;
    this.activateRoute.params.subscribe( (resp:any) => {
      this.meeting_id = resp.meeting_id;
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
      this.getFinalReport();
    });
  }

  getFinalReport(){
    this.meetingSrv.getFinalReport(this.meeting_id).subscribe( (resp:any) => {
      this.final_result = resp.final_result;
      console.log(this.final_result);
    });
  }

  generatePdf(){
    
    const options = {
      margin: 0.5,
      filename: 'junta_' + this.name + '.pdf',
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
    
    const element = document.getElementById('meet_result');
   
    
    html2pdf().from(element).set(options).save();
    
   
  }

}
