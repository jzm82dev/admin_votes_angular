import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection } from 'src/app/shared/models/models';
import { DatePipe } from '@angular/common';
import { RecurrentService } from '../service/recurrent.service';
import { routes } from 'src/app/shared/routes/routes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-recurrent',
  templateUrl: './list-recurrent.component.html',
  styleUrls: ['./list-recurrent.component.scss']
})
export class ListRecurrentComponent {

  public reservationsList: Array<any> = [];
  @ViewChild('closebutton') closebutton: any;
 private modalError: any;

  public routes = routes;
  dataSource!: MatTableDataSource<any>;

  public WeekDays:any = [];

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
  public reservations_general: any = [];
  public reservation_selected: any;
  public statusText = '';
  public specialities: any = [];
  public specialitie_id: any;
  public date: string = '';
  public user: any;
  public translations:any = [];
  public kind_sport: any = [];


  constructor(public data : DataService, public reservationSrv: RecurrentService, public translate: TranslateService){
  }
  ngOnInit() {
   
    this.initializeLanguage();

    this.getTableData();
    this.user = this.reservationSrv.authSrv.user;
  }
  
  initializeLanguage(){
    this.translate.use(this.reservationSrv.authSrv.language);
    this.translate.setDefaultLang(this.reservationSrv.authSrv.language);
    this.translate.get(['commun_translations', 'club_translations', 'club_translations.schedule', 'reservations'])
    .subscribe((resp:any) => {
      this.translations = resp;
      this.initializeArrays();
    });
  }


  initializeArrays(){
    this.WeekDays = [this.translations['commun_translations'].day_1, 
                this.translations['commun_translations'].day_2,
                this.translations['commun_translations'].day_3,
                this.translations['commun_translations'].day_4,
                this.translations['commun_translations'].day_5,
                this.translations['commun_translations'].day_6,
                this.translations['commun_translations'].day_7];

    this.kind_sport.push(
                { id: 0, name: '...'},
                { id: 1, name: this.translations["club_translations"].sport_1},
                { id: 2, name: this.translations["club_translations"].sport_2},
                { id: 6, name: this.translations["club_translations"].sport_3},
                { id: 3, name: this.translations["club_translations"].sport_4},
                { id: 4, name: this.translations["club_translations"].sport_5}
              );
  }
  

  private getTableData(page = 1, search = '', speciality = '', date = ''): void {
    this.reservationsList = [];
    this.serialNumberArray = [];

    this.reservationSrv.listReservationsRecurrent(page, this.searchDataValue, speciality, date).subscribe((resp: any) => {
      this.totalData = resp.total;
      this.reservationsList = resp.reservations;
      this.addDayName();
      //this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.reservationsList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  addDayName(){
    let id_weeek_number = 0;
    this.reservationsList.forEach((element:any) => {
      let aux = element.day_week_number.split("day_").pop();
      id_weeek_number = +aux -1;
      element.day_name = this.WeekDays[id_weeek_number];
    });
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

  isPermited(){
    let flag = false;
    let roles = this.user.role;
    roles.forEach( (rol:any) => {
      if(rol.toUpperCase() == 'DOCTOR'){
        flag = true;
      }
    });
    
    return flag;
  }

  getTableDataGeneral() {
    let pipe = new DatePipe('en-US');
    this.reservationsList = [];
    this.serialNumberArray = [];

    this.reservations_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.reservationsList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.reservationsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
public searchData(value: any): void {
  this.dataSource.filter = value.trim().toLowerCase();
  //this.teamsList = this.dataSource.filteredData;
  this.getTableData(this.currentPage, this.searchDataValue)
}


  public sortData(sort: any) {
    const data = this.reservationsList.slice();

    if (!sort.active || sort.direction === '') {
      this.reservationsList = data;
    } else {
      this.reservationsList = data.sort((a, b) => {
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
    this.specialitie_id = '';
    this.date = '';
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

  selectReservation( reservation:any){
    this.reservation_selected = reservation;
    console.log(this.reservation_selected);
  }

  removeReservation(){
    let data = {
      'reservation_mobile': this.reservation_selected.reservation_owner_mobile,
      'day_week_number': this.reservation_selected.day_week_number,
      'start_time': this.reservation_selected.start_time,
    };
    
    
    this.reservationSrv.deleteRecurrentReservation(this.reservation_selected.id).subscribe( (resp:any) =>{
      if( resp.message == 200){
        let index = this.reservationsList.findIndex((item:any) => item.id == this.reservation_selected.id);
        if(index != -1){
          this.reservationsList.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.reservation_selected = null;
        }
        
      }else{
        console.log(resp)
      }
    });
    
    
  }

  search(){
    
  }
  
}
