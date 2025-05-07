import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection } from 'src/app/shared/models/models';
import { StaffService } from '../../staff/service/staff.service';
import { SpecialityService } from '../service/speciality.service';

@Component({
  selector: 'app-list-speciality',
  templateUrl: './list-speciality.component.html',
  styleUrls: ['./list-speciality.component.scss']
})
export class ListSpecialityComponent {
  
  public specialitiesList: Array<any> = [];
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
  public specialities_general: any = [];
  public speciality_selected: any;
  public statusText = '';
  public user: any;


  constructor(public data : DataService, public specialitySrv: SpecialityService){
  }
  ngOnInit() {
    this.user = this.specialitySrv.authSrv.user;
    this.getTableData();
  }
  private getTableData(): void {

    this.specialitiesList = [];
    this.serialNumberArray = [];

    this.specialitySrv.listSpecialities().subscribe((resp: any) => {
      this.totalData = resp.specialities.length;
      this.specialities_general = resp.specialities;
      this.getTableDataGeneral();
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
    this.specialitiesList = [];
    this.serialNumberArray = [];

    this.specialities_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        if(res.state == '1'){
          res.status_text = 'Active'
        }else{
          res.status_text = 'Deactivate';
        }
        this.specialitiesList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.specialitiesList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.specialitiesList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.specialitiesList.slice();

    if (!sort.active || sort.direction === '') {
      this.specialitiesList = data;
    } else {
      this.specialitiesList = data.sort((a, b) => {
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

  selectSpeciality( speciality:any){
    this.speciality_selected = speciality;
  }

  removeSpeciality(){
    this.specialitySrv.deleteSpeciality(this.speciality_selected.id).subscribe( (resp:any) =>{
      if( resp.message == 200){
        let index = this.specialitiesList.findIndex((item:any) => item.id == this.speciality_selected.id);
        if(index != -1){
          this.specialitiesList.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.speciality_selected = null;
        }
      }else{
        console.log(resp)
      }
    });
  }
}
