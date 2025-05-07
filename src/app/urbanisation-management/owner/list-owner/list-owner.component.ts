import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection } from 'src/app/shared/models/models';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/shared/routes/routes';
import { OwnerService } from '../service/owner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-owner',
  templateUrl: './list-owner.component.html',
  styleUrls: ['./list-owner.component.scss']
})
export class ListOwnerComponent {

  public ownersList: Array<any> = [];
   @ViewChild('closebutton') closebutton: any;
   
   private modalError: any;
   public routes = routes;
   dataSource!: MatTableDataSource<any>;
 
   public showFilter = false;
   public searchDataValue = '';
   public lastIndex = 0;
   public pageSize = 18;
   public totalData = 0;
   public skip = 0;
   public limit: number = this.pageSize;
   public pageIndex = 0;
   public serialNumberArray: Array<number> = [];
   public currentPage = 1;
   public pageNumberArray: Array<number> = [];
   public pageSelection: Array<pageSelection> = [];
   public totalPages = 0;
   public owners_general: any = [];
   public court_selected: any;
   public statusText = '';
   public error_message: string = '';
   public user: any;  
   public can_edit:boolean = false; 
   public translations:any = [];
   public kind_sport: any = [];
   public type_sport: string = '0';
   public building_id: string = '';
   public building: any = [];
   public urbanisation_id: string = '';
 
 
   constructor( public ownerSrv: OwnerService, public translate: TranslateService, public activateRoute: ActivatedRoute){
   }

   ngOnInit() {
    
 
     this.initializeLanguage();
 
     this.user = this.ownerSrv.authSrv.user;
     this.hasPermission();
     this.config();
     this.activateRoute.params.subscribe( (resp:any) => {
      this.urbanisation_id = resp.urbanisation_id;
      this.getTableData();
    });
    
   }


   config(){
    this.ownerSrv.config().subscribe((resp: any) => {
      this.building = resp.building;
    });
   }
 
 
   initializeLanguage(){
     this.translate.use(this.ownerSrv.authSrv.language);
     this.translate.setDefaultLang(this.ownerSrv.authSrv.language);
     this.translate.get(['commun_translations', 'club_translations', 'club_translations.club_information_messages'])
     .subscribe((resp:any) => {
       this.translations = resp;
     }); 
   }
 
 
 
 
   private getTableData(page = 1, search = ''): void {
     this.ownersList = [];
     this.serialNumberArray = [];
 
     this.ownerSrv.listOwners(page, this.searchDataValue, this.urbanisation_id, this.building_id).subscribe((resp: any) => {
       this.totalData = resp.total;
       this.ownersList = resp.owners.data;
       //this.getTableDataGeneral();
       this.dataSource = new MatTableDataSource<any>(this.ownersList);
       this.calculateTotalPages(this.totalData, this.pageSize);
     });
   }
 
   hasPermission( permision: string = ''){
     if(this.user.role.includes('Super-Admin')){
       this.can_edit = true;
       return true;
     }
 
     if(this.user.permissions.includes('edit_club') ){
       this.can_edit = true;
       return true;
     }
 
     return false;
   }
   
   getTableDataGeneral() {
     let pipe = new DatePipe('en-US');
     this.ownersList = [];
     this.serialNumberArray = [];
 
     this.owners_general.map((res: any, index: number) => {
       const serialNumber = index + 1;
       if (index >= this.skip && serialNumber <= this.limit) {
         this.ownersList.push(res);
         this.serialNumberArray.push(serialNumber);
       }
     });
     
     this.dataSource = new MatTableDataSource<any>(this.ownersList);
     this.calculateTotalPages(this.totalData, this.pageSize);
   }
 
   
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   public searchData(value: any): void {
    this.currentPage = 1;
     this.dataSource.filter = value.trim().toLowerCase();
     //this.ownersList = this.dataSource.filteredData;
     this.getTableData(this.currentPage, this.searchDataValue)
   }
 
   public sortData(sort: any) {
     const data = this.ownersList.slice();
 
     if (!sort.active || sort.direction === '') {
       this.ownersList = data;
     } else {
       this.ownersList = data.sort((a, b) => {
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
 
   selectOwner( court:any){
     this.court_selected = court;
   }
 
   cleanMessage(){
     this.error_message = '';
   }
 
   removeOwner(){
     /*
     this.ownerSrv.deleteOwner(this.court_selected.id).subscribe( (resp:any) =>{
 
       if( resp.message == 200){
         let index = this.ownersList.findIndex((item:any) => item.id == this.court_selected.id);
         if(index != -1){
           this.ownersList.splice(index, 1);
           this.closebutton.nativeElement.click();
           this.court_selected = null;
           this.totalData --;
         }
       }else if(resp.message == 422) {
         this.closebutton.nativeElement.click();
         Swal.fire({
           title: "Error",
           text: resp.errors_text,
           icon: "warning"
         });
         return;
       } else {
         this.error_message = 'Ha habido un error al intentar eliminar la pista. Consulte con su administrador.';
       }
 
     });
     */
   }

   selectUrbanisation(data: any){

   }

}
