import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection } from 'src/app/shared/models/models';
import { MonitorsService } from '../service/monitors.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-monitor',
  templateUrl: './list-monitor.component.html',
  styleUrls: ['./list-monitor.component.scss']
})
export class ListMonitorComponent {
  public monitorsList: Array<any> = [];
  @ViewChild('closebutton') closebutton: any;
 private modalError: any;

  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 7;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public monitors_general: any = [];
  public monitor_selected: any;
  public birthdayBeauty: string = '';
  public user: any;
  public kind_sport: any = [];
  public translations:any = [];


  constructor(public data : DataService, public monitorSrv: MonitorsService, public translate: TranslateService){
  }
  ngOnInit() {
    this.user = this.monitorSrv.authSrv.user;
    this.initializeLanguage()
    this.getTableData();
  }


  private getTableData(): void {

    this.monitorsList = [];
    this.serialNumberArray = [];

    this.monitorSrv.listMonitors().subscribe((resp: any) => {
      this.totalData = resp.monitor.data.length;
      this.monitors_general = resp.monitor.data;
      this.getTableDataGeneral();
    });
  }


  initializeLanguage(){
    this.translate.use(this.monitorSrv.authSrv.language);
    this.translate.setDefaultLang(this.monitorSrv.authSrv.language);

    this.translate.get(['club_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.typeOfSports();
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

  getTableDataGeneral() {
    let pipe = new DatePipe('en-US');
    this.monitorsList = [];
    this.serialNumberArray = [];

    this.monitors_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.monitorsList.push(res);
        res.birthday =  pipe.transform(res.birthday, 'dd/MM/yyyy');
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.monitorsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.monitorsList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.monitorsList.slice();

    if (!sort.active || sort.direction === '') {
      this.monitorsList = data;
    } else {
      this.monitorsList = data.sort((a, b) => {
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
    this.getTableDataGeneral();
  }

  public refresh(): void {
    this.pageSelection = [];
    this.searchDataValue = '';
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneral();
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

  selectMonitor( monitor:any){
    this.monitor_selected = monitor;
  }

  removeMonitor(){
      this.monitorSrv.deleteMonitor(this.monitor_selected.id).subscribe( (resp:any) => {
        if( resp.message == 200){
          let index = this.monitorsList.findIndex((item:any) => item.id == this.monitor_selected.id);
          if(index != -1){
            this.monitorsList.splice(index, 1);
            this.closebutton.nativeElement.click();
            this.monitor_selected = null;
          }
        }else{
          console.log(resp)
        }
      })
  }


  typeOfSports(){
    this.kind_sport.push( { id: 0, name: '...'});
    
    

     this.kind_sport.push({ id: 1, name: this.translations["club_translations"].sport_1});
   
      this.kind_sport.push({ id: 2, name: this.translations["club_translations"].sport_2});
    
      this.kind_sport.push({ id: 3, name: this.translations["club_translations"].sport_3});
    
      this.kind_sport.push({ id: 4, name: this.translations["club_translations"].sport_4});
    
      this.kind_sport.push({ id: 5, name: this.translations["club_translations"].sport_5});
    
  }


}
