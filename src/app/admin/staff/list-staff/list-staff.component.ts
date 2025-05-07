import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { apiResultFormat, doctorlist, pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { StaffService } from '../service/staff.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.scss']
})
export class ListStaffComponent {
  
  public staffsList: Array<any> = [];
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
  public staffs_general: any = [];
  public staff_selected: any;
  public birthdayBeauty: string = '';
  public user: any;
  

  constructor(public data : DataService, public staffSrv: StaffService){
  }
  ngOnInit() {
    this.getTableData();
    this.user = this.staffSrv.authSrv.user;
  }


  private getTableData(): void {

    this.staffsList = [];
    this.serialNumberArray = [];

    this.staffSrv.listStaffs().subscribe((resp: any) => {
      console.log(resp.user.data)
      this.totalData = resp.user.data.length;
      this.staffs_general = resp.user.data;
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
    this.staffsList = [];
    this.serialNumberArray = [];

    this.staffs_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        console.log('RES:', res)
        this.staffsList.push(res);
        res.birthday =  pipe.transform(res.birthday, 'dd/MM/yyyy');
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.staffsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.staffsList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.staffsList.slice();

    if (!sort.active || sort.direction === '') {
      this.staffsList = data;
    } else {
      this.staffsList = data.sort((a, b) => {
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

  selectStaff( staff:any){
    this.staff_selected = staff;
    console.log(this.staff_selected);
  }

  removeStaff(){
      this.staffSrv.deleteStaff(this.staff_selected.id).subscribe( (resp:any) => {
        if( resp.message == 200){
          let index = this.staffsList.findIndex((item:any) => item.id == this.staff_selected.id);
          if(index != -1){
            this.staffsList.splice(index, 1);
            this.closebutton.nativeElement.click();
            this.staff_selected = null;
          }
        }else{
          console.log(resp)
        }
      })
  }
}
