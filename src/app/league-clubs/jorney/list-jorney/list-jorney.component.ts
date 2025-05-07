import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { JorneyService } from '../service/jorney.service';
import { pageSelection } from 'src/app/shared/models/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-jorney',
  templateUrl: './list-jorney.component.html',
  styleUrls: ['./list-jorney.component.scss']
})
export class ListJorneyComponent {

  
  public jorneysList: Array<any> = [];
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
  public jorneys_general: any = [];
  public jorney_selected: any;
  public statusText = '';
  public user: any;


  constructor(public data : DataService, public jorneySrv: JorneyService){
  }
  ngOnInit() {
    this.user = this.jorneySrv.authSrv.user;
    this.getTableData();
  }
  private getTableData(page = 1, search = ''): void {
    this.jorneysList = [];
    this.serialNumberArray = [];

    this.jorneySrv.listJorneys(page, this.searchDataValue).subscribe((resp: any) => {
      this.totalData = resp.total;
      this.jorneysList = resp.journeys;
      //this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.jorneysList);
      this.calculateTotalPages(this.totalData, this.pageSize);
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
    this.jorneysList = [];
    this.serialNumberArray = [];

    this.jorneys_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.jorneysList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.jorneysList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    //this.jorneysList = this.dataSource.filteredData;
    this.getTableData(this.currentPage, this.searchDataValue)
  }

  public sortData(sort: any) {
    const data = this.jorneysList.slice();

    if (!sort.active || sort.direction === '') {
      this.jorneysList = data;
    } else {
      this.jorneysList = data.sort((a, b) => {
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

  selectJorney( jorney:any){
    this.jorney_selected = jorney;
  }

  removeClub(){
    this.jorneySrv.deleteJorney(this.jorney_selected.id).subscribe( (resp:any) =>{
      if( resp.message == 200){
        let index = this.jorneysList.findIndex((item:any) => item.id == this.jorney_selected.id);
        if(index != -1){
          this.jorneysList.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.jorney_selected = null;
        }
      }else{
        console.log(resp)
      }
    });
  }

}
