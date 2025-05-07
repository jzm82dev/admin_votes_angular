import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { JourneyService } from '../service/journey.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-journey',
  templateUrl: './list-journey.component.html',
  styleUrls: ['./list-journey.component.scss']
})
export class ListJourneyComponent {

  public routes = routes;
  public category_id: string = '';
  public journeysList: Array<any> = [];
  @ViewChild('closebutton') closebutton: any;
  
  private modalError: any;
  dataSource!: MatTableDataSource<any>;

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
  public journeys_general: any = [];
  public journey_selected: any;
  public statusText = '';
  public error_message: string = '';
  public user: any;  
  public can_edit:boolean = false; 
  public isLoaded: boolean = false;
  public translations:any = [];
  public total_couples: number = 0;
  public type_category: string = '';
  public pending_text:string = '';
  public finished_text:string = '';
  public type_matchs = 'double';
  public match_tab_player: string = 'Players';
  public league_id: string = '';
  public category_name: string = '';

  constructor(public journeySrv: JourneyService, public activateRoute: ActivatedRoute, public translate: TranslateService){}

  ngOnInit(): void {
    this.user = this.journeySrv.authSrv.user;
    this.initializeLanguage();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.id;
    });
    this.getTableData();
  }

  initializeLanguage(){
    
    this.translate.use(this.journeySrv.authSrv.language);
    this.translate.setDefaultLang(this.journeySrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.pending_text = this.translations['leagues'].journeys.pending;
        this.finished_text = this.translations['leagues'].journeys.finished;
      }); 
  }

  private getTableData(page = 1, search = ''): void {
    this.journeysList = [];
    this.serialNumberArray = [];

    this.journeySrv.listJourneys(page, this.category_id ,this.searchDataValue).subscribe((resp: any) => {
      this.totalData = resp.total;
      this.journeysList = resp.journeys;
      this.total_couples = resp.total_couples;
      this.type_category = resp.type_category;
      //this.getTableDataGeneral();
      this.type_matchs = resp.type_matchs;
      this.league_id = resp.league_id;
      this.category_name = resp.category_name;
      if( this.type_matchs == 'singles'){
        this.match_tab_player = this.translations['leagues'].tabs.players;
      }else{
        this.match_tab_player = this.translations['leagues'].tabs.couples;
      }
      this.dataSource = new MatTableDataSource<any>(this.journeysList);
      this.calculateTotalPages(this.totalData, this.pageSize);
      this.isLoaded=true;
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
  
  getTableDataGeneral() {
    let pipe = new DatePipe('en-US');
    this.journeysList = [];
    this.serialNumberArray = [];

    this.journeys_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.journeysList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.journeysList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    //this.journeysList = this.dataSource.filteredData;
    this.getTableData(this.currentPage, this.searchDataValue)
  }

  public sortData(sort: any) {
    const data = this.journeysList.slice();

    if (!sort.active || sort.direction === '') {
      this.journeysList = data;
    } else {
      this.journeysList = data.sort((a, b) => {
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

  selectCourt( court:any){
    this.journey_selected = court;
  }

  cleanMessage(){
    this.error_message = '';
  }

  createCalendar(){
    this.journeySrv.createCalendar( this.category_id).subscribe( (resp: any)=> {
      this.journeysList = resp.journeys;
      this.totalData = resp.total;
    });
  }

}
