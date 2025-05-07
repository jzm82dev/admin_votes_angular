import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { apiResultFormat, pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { AppointmentPayService } from '../service/appointment-pay.service';
import { DatePipe } from '@angular/common';

interface data {
  value: string ;
}

@Component({
  selector: 'app-list-appointment-pay',
  templateUrl: './list-appointment-pay.component.html',
  styleUrls: ['./list-appointment-pay.component.scss']
})
export class ListAppointmentPayComponent {

  public routes = routes;
  
  public salary: Array<any> = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public specialitie_value: string = ''  ;
  public specialities: any = [];
  public date_from: string = '';
  public date_to: string = '';
  public searchDataPatientValue: string = '';
  public searchDataDoctorValue: string = '';

  public selectAppointment: any;

  public appointmentPaysList: any = [];
  public appointment_pays_general: any = [];

  public amount_prepayment: number = 0;
  public payment_method: string = '';
  public appointment: any;
  public text_modal_valid: string = '';
  public text_modal_success: string = '';
  public appointment_pay_selected: any;


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
  public user: any;

  constructor(public data : DataService, public appointmentPaysSrv: AppointmentPayService){
  }
  ngOnInit() {
    this.appointmentPaysSrv.config().subscribe( (resp: any) => {
      this.specialities = resp.specialities;
    } )
    this.getTableData();
    this.user = this.appointmentPaysSrv.authSrv.user;
  }


  private getTableData(page = 1, nameDoctor = '', nameClient = '', speciality = '', dateFrom = '', dateTo = ''): void {
    console.log(page);
    this.appointmentPaysList = [];
    this.serialNumberArray = [];
    let pipe = new DatePipe('en-US');
    let date_from: any;
    let date_to: any;
    if(dateFrom){
      date_from = pipe.transform(dateFrom, 'yyyy-MM-dd')
    }
    if(dateTo){
      date_to = pipe.transform(dateTo, 'yyyy-MM-dd')
    }
    this.appointmentPaysSrv.listAppointmentPays(page, nameDoctor,nameClient,  speciality, date_from, date_to).subscribe((resp: any) => {
      console.log(resp)
      this.totalData = resp.total;
      this.appointmentPaysList = resp.appointments
      this.dataSource = new MatTableDataSource<any>(this.appointmentPaysList);
      this.calculateTotalPages(this.totalData, this.pageSize);
      
    });
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
    this.appointmentPaysList = [];
    this.serialNumberArray = [];

    this.appointment_pays_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.appointmentPaysList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.appointmentPaysList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  

  public sortData(sort: any) {
    const data = this.appointmentPaysList.slice();

    if (!sort.active || sort.direction === '') {
      this.appointmentPaysList = data;
    } else {
      this.appointmentPaysList = data.sort((a: any, b: any) => {
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

  public refresh() {
    this.pageSelection = [];
    this.searchDataDoctorValue = '';
    this.searchDataPatientValue = '';
    this.specialitie_value = '';
    this.date_from = '';
    this.date_to = '';
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


  getAppointment( appointment: any){
    this.appointment = appointment;
  }

  addPaymentPay(){
    this.text_modal_valid = '';
    if( !this.payment_method || !this.amount_prepayment){
      this.text_modal_valid = 'Ambos campos son obligatorios';
      return;
    }
    let data = {
      appointment_id: this.appointment.id,
      amount: this.amount_prepayment,
      method: this.payment_method
    }
    this.appointmentPaysSrv.registerAppointmentPay(data).subscribe( (resp:any) => {
      if( resp.message == 403){
        this.text_modal_valid = resp.message_text;
      }else{
        this.text_modal_success = 'Pago ingresado correctamente';
        this.amount_prepayment = 0;
        this.payment_method = '';
        this.appointment.payments.push(resp.appointment_pay);
        if( resp.update_status != ''){
          this.updateStatus(resp.update_status);
        }
      }
    })
  }

  updatePaymentPay(){
    this.text_modal_valid = '';
    if( !this.payment_method || !this.amount_prepayment){
      this.text_modal_valid = 'Ambos campos son obligatorios';
      return;
    }
    let data = {
      appointment_id: this.appointment.id,
      amount: this.amount_prepayment,
      method: this.payment_method
    }

    this.appointmentPaysSrv.updateAppointmentPay(this.appointment_pay_selected.id, data).subscribe( (resp: any) =>{
      if( resp.message == 403){
        this.text_modal_valid = resp.message_text;
      }else{
        this.text_modal_success = 'Pago actualizado correctamente';
        this.updatePaymentData();
        
        if( resp.update_status != ''){
          this.updateStatus(resp.update_status);
        }
      }
    })
  }

  selectedPayment(appointment: any, paymentPay: any){
    this.appointment = appointment; 
    this.appointment_pay_selected = paymentPay;
    this.amount_prepayment = paymentPay.amount;
    this.payment_method = paymentPay.method_payment;
  }

  deleteAppointmentPay(){
    console.log('vamos a eliminar el id: ', this.appointment_pay_selected.id);
    this.appointmentPaysSrv.deleteAppointmentPay( this.appointment_pay_selected.id ).subscribe( (resp:any) => {
      if( resp.message == 403){
        this.text_modal_valid = resp.message_text;
      }else{
        this.text_modal_success = 'Pago eliminado correctamente';
        let index = this.appointment.payments.findIndex((item:any) => item.id == this.appointment_pay_selected.id);
        if( index != -1){
          this.appointment.payments.splice(index, 1);
        }
      }
    })

  }


  updateStatus(status: number){
    let index = this.appointmentPaysList.data.findIndex((item:any) => item.id == this.appointment.id);
    if(index != -1){
      this.appointmentPaysList.data[index].status_pay = status;
    }
  }


  updatePaymentData(){
    let index = this.appointment.payments.findIndex((item:any) => item.id == this.appointment_pay_selected.id);
    if( index != -1){
      this.appointment.payments[index].amount = this.amount_prepayment;
      this.appointment.payments[index].method_payment = this.payment_method;
    }
    this.amount_prepayment = 0;
    this.payment_method = '';
  }

  cleanMessage(){
    this.text_modal_valid = ''
    this.text_modal_success = '';
  }

  closeModal(){
    this.appointment_pay_selected = null;
    this.amount_prepayment = 0;
    this.payment_method = '';
    this.cleanMessage();
  }


  filter(){
     this.searchDataDoctorValue = this.searchDataDoctorValue.trim().toLowerCase();
     this.searchDataPatientValue = this.searchDataPatientValue.trim().toLowerCase();
    //this.appointmentPaysList = this.dataSource.filteredData;
    this.getTableData(this.currentPage, this.searchDataDoctorValue, this.searchDataPatientValue, this.specialitie_value, this.date_from, this.date_to)
  
  }

 
}
