import { Component, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { AppointmentService } from '../service/appointment.service';
import { pageSelection } from 'src/app/shared/models/models';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss']
})
export class ListAppointmentsComponent {

  public appointmentsList: Array<any> = [];
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
  public appointments_general: any = [];
  public appointment_selected: any;
  public statusText = '';
  public specialities: any = [];
  public specialitie_id: any;
  public date: string = '';
  public user: any;


  constructor(public data : DataService, public appointmentSrv: AppointmentService){
  }
  ngOnInit() {
    this.appointmentSrv.config().subscribe( (resp: any) => {
      this.specialities = resp.specialities;
        console.log(resp);
    } )
    this.getTableData();
    this.user = this.appointmentSrv.authSrv.user;
  }
  
  private getTableData(page = 1, search = '', speciality = '', date = ''): void {
    this.appointmentsList = [];
    this.serialNumberArray = [];

    this.appointmentSrv.listAppointment(page, this.searchDataValue, speciality, date).subscribe((resp: any) => {
      this.totalData = resp.total;
      this.appointmentsList = resp.appointments.data;
      console.log(this.appointmentsList)
      //this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.appointmentsList);
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
    
    this.appointmentsList = [];
    this.serialNumberArray = [];

    this.appointments_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.appointmentsList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.appointmentsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(): void {
    console.log('search_data_value:', this.searchDataValue);
    console.log('specialitie_id:', this.specialitie_id);
    console.log('date:', this.date);
    //this.dataSource.filter = this.searchDataValue.trim().toLowerCase();
    //this.appointmentsList = this.dataSource.filteredData;
    this.getTableData(this.currentPage, this.searchDataValue, this.specialitie_id, this.date)
  }

  public sortData(sort: any) {
    const data = this.appointmentsList.slice();

    if (!sort.active || sort.direction === '') {
      this.appointmentsList = data;
    } else {
      this.appointmentsList = data.sort((a, b) => {
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

  selectAppointment( appointment:any){
    this.appointment_selected = appointment;
    console.log(this.appointment_selected);
  }

  removeAppointment(){
    this.appointmentSrv.deleteAppointment(this.appointment_selected.id).subscribe( (resp:any) =>{
      if( resp.message == 200){
        let index = this.appointmentsList.findIndex((item:any) => item.id == this.appointment_selected.id);
        if(index != -1){
          this.appointmentsList.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.appointment_selected = null;
        }
      }else{
        console.log(resp)
      }
    });
  }

  search(){
    
  }
}
