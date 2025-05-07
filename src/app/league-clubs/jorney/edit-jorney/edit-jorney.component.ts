import { Component, ViewChild } from '@angular/core';
import { JorneyService } from '../service/jorney.service';
import { routes } from 'src/app/shared/routes/routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-jorney',
  templateUrl: './edit-jorney.component.html',
  styleUrls: ['./edit-jorney.component.scss']
})
export class EditJorneyComponent {
  public routes = routes;
  @ViewChild('closebutton') closebutton: any;

  public name: string = '';
  public date_planned: string = '';
  public description: string = '';
  public jorney_id: string = '';
  public jorney_selected: any;
  public category_selected_id: number = 0;

  public success_message: string = '';
  public error_message: string = '';
  public tab_selected: number = 1;
  public list_categories: any = [];
  public text_modal_success: string = '';
  public local_team: string = '';
  public visiting_team: string = '';
  public flag: boolean = false;
  public error_message_popup: string = '';
  public matches_category: any = [];

  public game_items_data:any = [];
  public index_array: number = 0;




  public resul_set_1_local: string = '';
  public resul_set_1_visiting: string = '';
  public resul_set_2_local: string = '';
  public resul_set_2_visiting: string = '';
  public resul_set_3_local: string = '';
  public resul_set_3_visiting: string = '';

  public player_by_team_matriz: any[] = [];
  public flag2: boolean = false;
  

  public text_game_success: string = '';
  public text_game_fail: string = '';

  public error_table_message:string = '';
  public success_table_message: string = '';
  public board_to_delete: any;
  public status: any;
  public cron_executed_at: any;

  

  constructor( public jorneySrv: JorneyService, public activateRoute: ActivatedRoute){}

  ngOnInit(): void {
   
    this.activateRoute.params.subscribe( (resp:any) => {
      this.jorney_id = resp.id;
      this.getJorneySelected();
      this.getCategories();
      this.defaultPlayer();
    })
  }


  getGameItems( data_items:any = ''){
    let data: any;
    if(data_items != ''){
      data = data_items;
    }else{
      data = {
        'journey_id': this.jorney_id,
        'category_id': this.list_categories[0].category_id
        }
      }
    this.jorneySrv.getGameItems(data).subscribe( (resp:any) => {
      this.game_items_data = resp.game_items;
      this.fillPlayers();
    });
  }

  getJorneySelected(){
    this.jorneySrv.getJorney(this.jorney_id).subscribe( (resp:any) => {
      this.jorney_selected = resp.jorney;
      this.name = this.jorney_selected.name
      this.description = this.jorney_selected.description
      if( resp.jorney.status == 1){
        this.status = true;
      }else{
        this.status = false;
      }
      this.cron_executed_at = resp.jorney.cron_executed_at;
      this.date_planned = new Date(this.jorney_selected.date).toISOString();
    });
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.error_message_popup = '';
    this.text_game_success = '';
    this.text_game_fail = '';
    this.error_table_message = '';
    this.success_table_message = '';
  }

  save(){
    this.cleanMessage();

    if( this.name == '' || this.date_planned == '' ){
      this.error_message = 'Los campos nombre y fecha prevista son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('date', this.date_planned);
    if(this.status ){
      formData.append('status', '1');
    }else{
      formData.append('status', '0');
    }
    
    

    this.jorneySrv.editJorney(this.jorney_id, formData).subscribe( (resp:any) => {
      if( resp.message != 200){
        this.error_message = 'Ha habido un error al actualizar la jornada. Consulte con su administrador.';
      }else{
        this.success_message = 'Jornada actualizada correctamente.';
      }
    })

  }

  getCategories(){
    this.flag = false;
    let data = {
      'journey_id': this.jorney_id
    };
    this.jorneySrv.getCategories(data).subscribe((resp:any) => {
      this.list_categories = resp.categories;
      this.flag = true;
      this.tabSeleted( this.list_categories[0].category_id, 0);
      //this.category_selected_id = this.list_categories[0].category_id;
      this.getGameItems();
    })
  }

  tabSeleted(category_id: number, index: number){
    this.tab_selected = category_id;
    this.category_selected_id = index;

    let data = {
      'journey_id': this.jorney_id,
      'category_id': category_id
    };
    this.getGameItems(data);
    this.jorneySrv.getGameJuorneyCategory(data).subscribe( (resp:any) =>{
      this.matches_category = resp.games;
    })
  }


  fillPlayers(){
    if(this.game_items_data.length == 0){
      this.defaultPlayer();
    }else{
      this.flag2 = true;
      this.game_items_data.forEach((element:any) => {
        this.player_by_team_matriz[element.game_number] = element
      });
    }
  }


  
  addMatchJourney(){

    if( this.local_team == '' || this.visiting_team == ''){
      this.error_message_popup = 'Tienes que seleccionar ambos equipos';
      return;
    }
    if( this.local_team == this.visiting_team ){
      this.error_message_popup = 'El equipo local y visitante no puede ser el mismo';
      return;
    }

    let data = {
      'journey_id': this.jorney_id,
      'category_id': this.tab_selected,
      'local_team_id': this.local_team,
      'visiting_team_id': this.visiting_team
    }

    this.jorneySrv.createGameJourney(data).subscribe( (resp:any) => {
      window.location.reload();
    })
    
  }

  
  openPopup(){
    
    this.local_team = '';
    this.visiting_team = '';
  } 

  saveBoard(match: any, cross: number ){
    
   let game_number = 1;
    if(cross == 1){
     game_number = 4;
    }
    let begin_for = game_number;
    let end_for = begin_for + 3;
    let error_player = false;
    for (let index = begin_for; index < end_for; index++) {
      
      let data = {
        'journey_id': this.jorney_id,
        'category_id': this.list_categories[this.tab_selected - 1].category_id,
        'game_id': match.id,
        'game_number': game_number,
        'local_player_1': this.player_by_team_matriz[index].local_player_1 ? this.player_by_team_matriz[index].local_player_1 : 0,
        'local_player_2': this.player_by_team_matriz[index].local_player_2 ? this.player_by_team_matriz[index].local_player_2 : 0,
        'visiting_player_1': this.player_by_team_matriz[index].visiting_player_1 ? this.player_by_team_matriz[index].visiting_player_1 : 0,
        'visiting_player_2': this.player_by_team_matriz[index].visiting_player_2 ? this.player_by_team_matriz[index].visiting_player_2 : 0,
        'result_set_1': this.player_by_team_matriz[index].result_set_1 ? this.player_by_team_matriz[index].result_set_1 : '',
        'result_set_2': this.player_by_team_matriz[index].result_set_2 ? this.player_by_team_matriz[index].result_set_2 : '',
        'result_set_3': this.player_by_team_matriz[index].result_set_3 ? this.player_by_team_matriz[index].result_set_3 : '',
      }
      this.jorneySrv.saveGameBoard(data).subscribe( (resp:any) => {
        if(resp.message = 200){
          this.success_table_message = 'Jugadores añadidos a los equipos correctamente';
        }
       }) 
      game_number++;
    }
  
  }

  seletedBoard(match: any, cross: number){
    this.board_to_delete = match;
  }

  deleteBoard(){
    let data = {
      board_id: this.board_to_delete.id
    }
    this.jorneySrv.deleteBoard(data).subscribe( (resp:any) => {
      if( resp.message == 200){
        let index = this.matches_category.findIndex((item:any) => item.id == this.board_to_delete.id);
        if(index != -1){
          this.matches_category.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.board_to_delete = null;
          this.success_table_message = 'Partidos borrados correctamente';
        }
      }else{
        console.log(resp);
      }
    })
  }



  defaultPlayer(){
    let game_number = 1;
    
    for (let index = 1; index < 7; index++) {
      let data = {
        'journey_id': 0,
        'category_id': 0,
        'game_id': 0,
        'game_number': game_number,
        'local_player_1': 0,
        'local_player_2': 0,
        'visiting_player_1': 0,
        'visiting_player_2': 0,
        'result_set_1' : '',
        'result_set_2' : '',
        'result_set_3' : '',
      }
      game_number++;
      this.player_by_team_matriz[index] = data;
     
    }
    this.flag2 = true;

  }

  setValue(event: KeyboardEvent) {
    const pattern = /[0-7-]/;
    
    
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}




}
