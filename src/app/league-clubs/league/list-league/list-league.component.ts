import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection } from 'src/app/shared/models/models';
import { LeagueService } from '../service/league.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-league',
  templateUrl: './list-league.component.html',
  styleUrls: ['./list-league.component.scss']
})
export class ListLeagueComponent {

  public leaguesList: Array<any> = [];
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
  public leagues_general: any = [];
  public league_selected: any;
  public statusText = '';
  public user: any;
  public kind_sport: any = [];
  public type_sport: string = '0';

  public translations:any = [];


  constructor(public data : DataService, public leagueSrv: LeagueService, public translate: TranslateService){ }

  
  ngOnInit() {
    this.initializeLanguage();
    this.user = this.leagueSrv.authSrv.user;
    this.getTableData();
  }

  private getTableData(page = 1, search = ''): void {
    this.leaguesList = [];
    this.serialNumberArray = [];

    this.leagueSrv.listLeagues(page, this.searchDataValue).subscribe((resp: any) => {
      this.totalData = resp.total;
      this.leaguesList = resp.leagues;
      this.getTextStatus(resp.match_finished,resp.match_pending);
      //this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.leaguesList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  getTextStatus(match_finished: Number, match_pending: Number){

    this.leaguesList.forEach((element:any) => {
      if(element.preregistrations == true){
        element.status = this.translations['leagues'].preregistrations;
      }else{
        if( element.match_finished == 0 && element.match_pending == 0){
          element.status = this.translations['leagues'].open;
        }else if (element.match_pending == 0 && element.match_finished > 0) {
          element.status = this.translations['leagues'].finished;;
        } else if(element.match_pending > 0){
          element.status = this.translations['leagues'].in_play;
        }
      }
    });
  }


  initializeLanguage(){
    
    this.translate.use(this.leagueSrv.authSrv.language);
    this.translate.setDefaultLang(this.leagueSrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues', 'club_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.getTypeSports();
      }); 
  }
  
  hasPermission( permision: string = ''){
    if(this.user.role.includes('Super-Admin')){
      return true;
    }

    if(this.user.permissions.includes(permision) ){
      return true;
    }

    return false;
  }
  
  getTableDataGeneral() {
    let pipe = new DatePipe('en-US');
    this.leaguesList = [];
    this.serialNumberArray = [];

    this.leagues_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.leaguesList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.leaguesList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    //this.leaguesList = this.dataSource.filteredData;
    this.getTableData(this.currentPage, this.searchDataValue)
  }

  public sortData(sort: any) {
    const data = this.leaguesList.slice();

    if (!sort.active || sort.direction === '') {
      this.leaguesList = data;
    } else {
      this.leaguesList = data.sort((a, b) => {
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

  selectLeague( league:any){
    this.league_selected = league;
  }

  removeLeague(){
    this.leagueSrv.deleteLeague(this.league_selected.id).subscribe( (resp:any) =>{
      if( resp.message == 200){
        let index = this.leaguesList.findIndex((item:any) => item.id == this.league_selected.id);
        if(index != -1){
          this.leaguesList.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.league_selected = null;
        }
      }else{
        console.log(resp)
      }
    });
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
