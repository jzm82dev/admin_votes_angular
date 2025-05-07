import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';

@Component({
  selector: 'app-list-tournaments',
  templateUrl: './list-tournaments.component.html',
  styleUrls: ['./list-tournaments.component.scss']
})
export class ListTournamentsComponent {

  public tab_selected: string = 'tournaments';
  public tournament_list: any = [];

  public tournamentsList: Array<any> = [];
  @ViewChild('closebutton') closebutton: any;
 private modalError: any;

  dataSource!: MatTableDataSource<any>;

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
  public tournaments_general: any = [];
  public tournament_selected: any;
  public statusText = '';
  public user: any;
  public kind_sport: any = [];
  public type_sport: string = '0';

  public translations:any = [];
  public hash_club: string = '';

  

  constructor(public clubDataSrv: ClubDataService, public translate: TranslateService, public activateRoute: ActivatedRoute){ }

  
  ngOnInit() {

    this.activateRoute.params.subscribe( (resp: any) => {
     
      this.hash_club = resp.hash;
    });
    
    this.initializeLanguage();
    this.getTableData();
    
  }

  private getTableData(page = 1, search = ''): void {
    this.tournamentsList = [];
    this.serialNumberArray = [];

    this.clubDataSrv.getTournaments(page, this.hash_club, this.searchDataValue).subscribe((resp: any) => {
      
      this.totalData = resp.total;
      this.tournamentsList = resp.tournaments;
      this.getTextStatus();
      //this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.tournamentsList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  getTextStatus(){

    this.tournamentsList.forEach((element:any) => {
      if(element.tournament_open == true){
        element.status = this.translations["club_translations"].status_open_inscriptions;
      }else if( element.is_finished){
        element.status = this.translations["club_translations"].status_finished;
      }else{
          if( element.matchs_finished > 0 && element.matchs_pending == 0){
            element.status = this.translations["club_translations"].status_finished;
          }else if ((element.matchs_finished > 0 && element.matchs_pending > 0) || (element.draw_generated == '1')) {
            element.status = this.translations["club_translations"].status_in_play
          }if(element.match_pending > 0){
            element.status = this.translations["club_translations"].status_open_inscriptions;
          }
      }
    });
  }


  initializeLanguage(){
    
    this.translate.use(this.clubDataSrv.authSrv.language);
    this.translate.setDefaultLang(this.clubDataSrv.authSrv.language);

    this.translate.get(['commun_translations', 'tournaments', 'club_translations', 'leagues'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.getTypeSports();
      }); 
  }
  
 
  
  getTableDataGeneral() {
    let pipe = new DatePipe('en-US');
    this.tournamentsList = [];
    this.serialNumberArray = [];

    this.tournaments_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.tournamentsList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.tournamentsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    //this.tournamentsList = this.dataSource.filteredData;
    this.getTableData(this.currentPage, this.searchDataValue)
  }

  public sortData(sort: any) {
    const data = this.tournamentsList.slice();

    if (!sort.active || sort.direction === '') {
      this.tournamentsList = data;
    } else {
      this.tournamentsList = data.sort((a, b) => {
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
      this.getTableData( this.currentPage);
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData( this.currentPage);
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
    this.getTableData();
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

  selectTournament( tournament:any){
    this.tournament_selected = tournament;
  }




  getTypeSports(){
    
    this.kind_sport.push(
      { id: 0, name: '...'},
      { id: 1, name: this.translations["club_translations"].sport_1},
      { id: 2, name: this.translations["club_translations"].sport_2},
      { id: 3, name: this.translations["club_translations"].sport_3},
      { id: 4, name: this.translations["club_translations"].sport_4},
      { id: 5, name: this.translations["club_translations"].sport_5}
    );
  }

}
