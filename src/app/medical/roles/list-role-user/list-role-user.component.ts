import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { pageSelection, apiResultFormat, doctorlist, rol } from 'src/app/shared/models/models';
import { RolesService } from '../service/roles.service';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-list-role-user',
  templateUrl: './list-role-user.component.html',
  styleUrls: ['./list-role-user.component.scss']
})
export class ListRoleUserComponent implements OnInit{

  public rolsList: Array<rol> = [];
  @ViewChild('closebutton') closebutton: any;
 private modalError: any;

  dataSource!: MatTableDataSource<rol>;

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
  public rols_general: any = [];
  public role_selected: any;
  public user: any;

  constructor(public data : DataService, public rolsSrv: RolesService){
  }
  ngOnInit() {
    this.getTableData();
    this.user = this.rolsSrv.authSrv.user;
  }
  private getTableData(): void {

    this.rolsList = [];
    this.serialNumberArray = [];

    this.rolsSrv.listRoles().subscribe((data: any) => {
      this.totalData = data.roles.length;
      this.rols_general = data.roles;
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
    this.rolsList = [];
    this.serialNumberArray = [];

    this.rols_general.map((res: rol, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.rolsList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<rol>(this.rolsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.rolsList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.rolsList.slice();

    if (!sort.active || sort.direction === '') {
      this.rolsList = data;
    } else {
      this.rolsList = data.sort((a, b) => {
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

  selectRole( role:any){
    this.role_selected = role;
    console.log(this.role_selected);
  }

  removeRole(){
      this.rolsSrv.deleteRoles(this.role_selected.id).subscribe( (resp:any) => {
        if( resp.message == 200){
          let index = this.rolsList.findIndex((item:any) => item.id == this.role_selected.id);
          if(index != -1){
            this.rolsList.splice(index, 1);
            this.closebutton.nativeElement.click();
            this.role_selected = null;
          }
        }else{
          console.log(resp)
        }
      })
  }
}
