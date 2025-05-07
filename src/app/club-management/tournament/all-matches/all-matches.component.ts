import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TournamentService } from '../services/tournament.service';
import { pageSelection } from 'src/app/shared/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CourtsService } from '../../club/courts/service/courts.service';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.scss']
})
export class AllMatchesComponent {

  public routes = routes;

  public user: any; 
  public tournament_id: string = '';
  public matches: any = [];
  public translations:any = [];

  dataSource!: MatTableDataSource<any>;
  public matchesList: Array<any> = [];
  
  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 20;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public matches_general: any = [];
  public staff_selected: any;
  public birthdayBeauty: string = '';
  public date: string = '';
  public searchDataPlayer: string = '';
  public status_match_value: string = '0'  ;
  public court_value: string = '';
  public courts_list: any = [];
  public categories_list: any = [];
  public date_start_tournament: string = '';
  public date_end_tournament: string = '';
  public category_id: string = '';
  public isLoaded:boolean = false;

  constructor( public tournamentSrv: TournamentService, public activateRoute: ActivatedRoute, public courtsSrv: CourtsService, 
               public translate: TranslateService){
  }

  ngOnInit(): void {
    this.user = this.tournamentSrv.authSrv.user;
    this.initializeLanguage();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.tournament_id = resp.tournament_id;
      this.config();
      this.getTableData();
    })
  }

  getTournamentMatches(){
    this.tournamentSrv.getAllMatchesTournament( this.tournament_id).subscribe( (resp:any) => {
      this.matches = resp.matches;
      this.getWeekDay();
    });
  }

  config(){
    this.tournamentSrv.configMatchesPage(this.tournament_id).subscribe((resp: any) => {
      this.courts_list = resp.courts;
      //this.date_start_tournament = resp.start_date;
      this.date_start_tournament = resp.tournament_start;
      this.date_end_tournament = resp.tournament_end;
      this.categories_list = resp.tournament_categories
    })
  }



  initializeLanguage(){
    
    this.translate.use(this.tournamentSrv.authSrv.language);
    this.translate.setDefaultLang(this.tournamentSrv.authSrv.language);

    this.translate.get(['commun_translations','leagues', 'tournaments' ])
      .subscribe((resp:any) => {
        this.translations = resp;
        
      }); 
  }

  
  getWeekDay(){
    let week_days:any = [];
    week_days.push(this.translations['commun_translations'].day_1);
    week_days.push(this.translations['commun_translations'].day_2); 
    week_days.push(this.translations['commun_translations'].day_3);
    week_days.push(this.translations['commun_translations'].day_4);
    week_days.push(this.translations['commun_translations'].day_5);
    week_days.push(this.translations['commun_translations'].day_6);
    week_days.push(this.translations['commun_translations'].day_7);
    
    this.matchesList.forEach( (match: any) => {
      const splitVal = match.time.split(' ');
      let day_hour = '';
      if( match.time.length > 0 ){
        day_hour = `${week_days[splitVal[0] - 1]} ${splitVal[1]} `
      }
      match.time = day_hour;
    });
    console.log(this.matches);
    
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

  getTableDataGeneral() {
    let pipe = new DatePipe('en-US');
    this.matchesList = [];
    this.serialNumberArray = [];

    this.matchesList.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        console.log('RES:', res)
        this.matchesList.push(res);
        res.birthday =  pipe.transform(res.birthday, 'dd/MM/yyyy');
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.matchesList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.matchesList = this.dataSource.filteredData;
    this.totalData = this.matchesList.length;
  }

  public sortData(sort: any) {
    const data = this.matchesList.slice();

    if (!sort.active || sort.direction === '') {
      this.matchesList = data;
    } else {
      this.matchesList = data.sort((a, b) => {
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
    console.log(pageNumber);
    
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
    this.status_match_value = '0';
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
    //this.appointmentPaysList = this.dataSource.filteredData;
    this.getTableData(this.currentPage, this.searchDataPlayer, this.date, this.category_id)
 
 }

 private getTableData(page = 1, namePlayer = '',  date = '', category_id = ''): void {
  this.matchesList = [];
  this.serialNumberArray = [];
  let pipe = new DatePipe('en-US');
  let date_match: any;
  let date_to: any;
  if(this.date){
    date_match = pipe.transform(this.date, 'yyyy-MM-dd')
  }
 
  this.tournamentSrv.getAllMatchesTournament(this.tournament_id, page, namePlayer, this.status_match_value, this.court_value, date_match, this.category_id).subscribe((resp: any) => {
    this.totalData = resp.total;
    this.matchesList = resp.matches
    this.getWeekDay();
    this.dataSource = new MatTableDataSource<any>(this.matchesList);
    this.calculateTotalPages(this.totalData, this.pageSize);
    this.isLoaded = true;
  });
}

}
