import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { MeetingService } from '../service/meeting.service';
import { OwnerService } from '../../owner/service/owner.service';
import { pageSelection } from 'src/app/shared/models/models';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})
export class AssistantsComponent {
  
  public routes = routes;

  public tab_selected: number = 1;
  public urbanisation_id: string = '1';
  public meeting_id: string = '';
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
     public ownersList: Array<any> = [];
     dataSource!: MatTableDataSource<any>;

  constructor( public meetingSrv: MeetingService, public activateRoute: ActivatedRoute, 
    public translate: TranslateService, public ownerSrv: OwnerService  ){}


  ngOnInit() {
      
   
       this.initializeLanguage();
   
       this.user = this.ownerSrv.authSrv.user;
       this.hasPermission();
       this.config();
       this.activateRoute.params.subscribe( (resp:any) => {
        this.urbanisation_id = resp.urbanisation_id;
        this.meeting_id = resp.meeting_id;
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
   
       this.ownerSrv.listAssistants(page, this.searchDataValue, this.urbanisation_id, this.building_id, this.meeting_id).subscribe((resp: any) => {
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
       this.building_id = '';
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
   
    
     cleanMessage(){
       this.error_message = '';
     }

     assistOwner(owner_id:string){
      this.meetingSrv.assistOwner(owner_id, this.meeting_id).subscribe( (resp:any) => {
        if( resp.message == '200'){
          let index = this.ownersList.findIndex((item:any) => item.id == owner_id);
          if(index != -1){
            this.ownersList[index].assistId = 'null';
          }
        }
      })
     }

     notAssistOwner(owner_id:string){
      this.meetingSrv.cancelAssistOwner(owner_id, this.meeting_id).subscribe( (resp:any) => {
        if( resp.message == '200'){
          let index = this.ownersList.findIndex((item:any) => item.id == owner_id);
          if(index != -1){
            this.ownersList[index].assistId = null;
          }
        }
      })
     }
   
     
}
