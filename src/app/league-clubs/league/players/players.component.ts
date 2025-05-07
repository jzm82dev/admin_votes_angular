import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/shared/routes/routes';
import { LeagueService } from '../service/league.service';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { TournamentService } from 'src/app/club-management/tournament/services/tournament.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {

  public routes = routes;
  public tab_selected: number = 1;
  public id_league: string = '';
  public can_edit:boolean = false; 
  public user: any;
  public loaded: boolean = false;
  public translations:any = [];

  dataSource!: MatTableDataSource<any>;
  public playersList: Array<any> = [];
  
  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public players_general: any = [];
  public staff_selected: any;
  public birthdayBeauty: string = '';
  public date: string = '';
  public searchDataPlayer: string = '';
  public payment_status: string = '0'  ;
  public court_value: string = '';
  public courts_list: any = [];
  public categories_list: any = [];
  public date_start_tournament: string = '';
  public date_end_tournament: string = '';
  public category_id: string = '';
  public isLoaded:boolean = false;

  
  constructor(public tournamentSrv: TournamentService,  public activateRoute: ActivatedRoute, public translate: TranslateService, public leagueSrv: LeagueService){ }

  ngOnInit(): void {
    
    this.initializeLanguage();
    this.user = this.leagueSrv.authSrv.user;
    this.hasPermission();
    
    this.activateRoute.params.subscribe( (resp:any) => {
      if(resp.id){
        this.id_league = resp.id;
        this.getTableData();
      }else{
        this.loaded = true;
      }
      if(resp.tab){
        this.tab_selected = resp.tab;
      }
    })
  }


  
  initializeLanguage(){
    this.translate.use(this.leagueSrv.authSrv.language);
    this.translate.setDefaultLang(this.leagueSrv.authSrv.language);

    this.translate.get(['commun_translations', 'tournaments', 'club_translations', 'tournaments.tournaments_messages', 'tournaments.type_category'])
      .subscribe((resp:any) => {
        this.translations = resp;
      });   
  }

  hasPermission( permision: string = ''){
    if(this.user.role.includes('Super-Admin')){
      this.can_edit = true;
      return true;
    }

    if(this.user.permissions.includes(permision) ){
      this.can_edit = true;
      return true;
    }

    return false;
  }

  tabSeleted(value: number){
    this.tab_selected = value;
  }


  getTableDataGeneral() {
        let pipe = new DatePipe('en-US');
        this.playersList = [];
        this.serialNumberArray = [];
    
        this.playersList.map((res: any, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            this.playersList.push(res);
            res.birthday =  pipe.transform(res.birthday, 'dd/MM/yyyy');
            this.serialNumberArray.push(serialNumber);
          }
        });
        
        this.dataSource = new MatTableDataSource<any>(this.playersList);
        this.calculateTotalPages(this.totalData, this.pageSize);
      }
    
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      public searchData(value: any): void {
        this.dataSource.filter = value.trim().toLowerCase();
        this.playersList = this.dataSource.filteredData;
        this.totalData = this.playersList.length;
      }
    
      public sortData(sort: any) {
        const data = this.playersList.slice();
    
        if (!sort.active || sort.direction === '') {
          this.playersList = data;
        } else {
          this.playersList = data.sort((a, b) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const aValue = (a as any)[sort.active];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const bValue = (b as any)[sort.active];
            return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
          });
        }
      }
    
      public getMoreData(event: string): void {
        if (event == 'next') {
          this.currentPage++;
          this.pageIndex = this.currentPage - 1;
          this.limit += this.pageSize;
          this.skip = this.pageSize * this.pageIndex;
          this.getTableDataGeneral();
        } else if (event == 'previous') {
          this.currentPage--;
          this.pageIndex = this.currentPage - 1;
          this.limit -= this.pageSize;
          this.skip = this.pageSize * this.pageIndex;
          this.getTableDataGeneral();
        }
      }
    
      public moveToPage(pageNumber: number): void {
        
        this.currentPage = pageNumber;
        this.skip = this.pageSelection[pageNumber - 1].skip;
        this.limit = this.pageSelection[pageNumber - 1].limit;
        if (pageNumber > this.currentPage) {
          this.pageIndex = pageNumber - 1;
        } else if (pageNumber < this.currentPage) {
          this.pageIndex = pageNumber + 1;
        }
        this.getTableData(this.currentPage);
      }
    
      public refresh(): void {
        this.pageSelection = [];
        this.searchDataValue = '';
        this.limit = this.pageSize;
        this.skip = 0;
        this.currentPage = 1;
        this.searchDataPlayer = '';
        this.payment_status = '0';
        this.court_value = '';
        this.date = '';
        this.category_id = '';
        this.getTableData();
        this.isLoaded = false;
      }
    
      private calculateTotalPages(totalData: number, pageSize: number): void {
        this.pageNumberArray = [];
        this.totalPages = totalData / pageSize;
        if (this.totalPages % 1 != 0) {
          this.totalPages = Math.trunc(this.totalPages + 1);
        }
        /* eslint no-var: off */
        for (var i = 1; i <= this.totalPages; i++) {
          const limit = pageSize * i;
          const skip = limit - pageSize;
          this.pageNumberArray.push(i);
          this.pageSelection.push({ skip: skip, limit: limit });
        }
      }
    
      filter(){
        this.searchDataPlayer = this.searchDataPlayer.trim().toLowerCase();
        this.currentPage = 1;
        //this.appointmentPaysList = this.dataSource.filteredData;
        this.getTableData(this.currentPage, this.searchDataPlayer, this.date, this.category_id)
     
     }
    
     private getTableData(page = 1, namePlayer = '',  date = '', category_id = ''): void {
      this.playersList = [];
      this.serialNumberArray = [];
      let pipe = new DatePipe('en-US');
      let date_match: any;
      let date_to: any;
      if(this.date){
        date_match = pipe.transform(this.date, 'yyyy-MM-dd')
      }
     
      this.leagueSrv.getAllPlayersLeague(this.id_league, page, namePlayer, this.payment_status, this.court_value, date_match, this.category_id).subscribe((resp: any) => {
        this.totalData = resp.total;
        this.playersList = resp.players.data;
        this.categories_list = resp.categories;
        this.dataSource = new MatTableDataSource<any>(this.playersList);
        this.calculateTotalPages(this.totalData, this.pageSize);
        this.isLoaded = true;
      });
    }
  
  
    paidTournament(player_id: string){
      this.leagueSrv.paidPlayerLeague(player_id).subscribe( (resp:any) => {
        if( resp.message == '200'){
          let index = this.playersList.findIndex((item:any) => item.id == player_id);
          if(index != -1){
            this.playersList[index].paid_status = 'PAID';
          }
        }
      })
    }
    
  
    unpaidTournament(player_id: string){
      this.leagueSrv.unpaidPlayerLeague(player_id).subscribe( (resp:any) => {
        if( resp.message == '200'){
          let index = this.playersList.findIndex((item:any) => item.id == player_id);
          if(index != -1){
            this.playersList[index].paid_status = 'PENDING';
          }
        }
      })
    }
  
}
