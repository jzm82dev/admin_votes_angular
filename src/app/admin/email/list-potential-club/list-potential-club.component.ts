import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection } from 'src/app/shared/models/models';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-list-potential-club',
  templateUrl: './list-potential-club.component.html',
  styleUrls: ['./list-potential-club.component.scss']
})
export class ListPotentialClubComponent {
public clubsList: Array<any> = [];
  @ViewChild('closebutton') closebutton: any;
 private modalError: any;

  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 15;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public clubs_general: any = [];
  public club_selected: any;
  public birthdayBeauty: string = '';
  public user: any;
  public translations:any = [];


  constructor(public data : DataService, public emailSrv: EmailService, public translate: TranslateService){
  }
  ngOnInit() {
    this.user = this.emailSrv.authSrv.user;
    this.initializeLanguage()
    this.getTableData();
  }


  private getTableData(): void {

    this.clubsList = [];
    this.serialNumberArray = [];

    this.emailSrv.listPotentialClubs().subscribe((resp: any) => {
      this.totalData = resp.clubs.length;
      this.clubs_general = resp.clubs;
      this.getTableDataGeneral();
    });
  }


  initializeLanguage(){
    this.translate.use(this.emailSrv.authSrv.language);
    this.translate.setDefaultLang(this.emailSrv.authSrv.language);

    this.translate.get(['club_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
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
    this.clubsList = [];
    this.serialNumberArray = [];

    this.clubs_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.clubsList.push(res);
        res.birthday =  pipe.transform(res.birthday, 'dd/MM/yyyy');
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.clubsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.clubsList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.clubsList.slice();

    if (!sort.active || sort.direction === '') {
      this.clubsList = data;
    } else {
      this.clubsList = data.sort((a, b) => {
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

  selectclub( club:any){
    this.club_selected = club;
  }

 
  removeclub(){
    this.emailSrv.deletePotenitialClub(this.club_selected.user_id).subscribe( (resp:any) => {
      if( resp.message == 200){
        let index = this.clubsList.findIndex((item:any) => item.user_id == this.club_selected.user_id);
        if(index != -1){
          this.clubsList.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.club_selected = null;
        }
      }else{
        console.log(resp)
      }
    })
}

}
