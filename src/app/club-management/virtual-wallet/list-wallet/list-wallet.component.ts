import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { VirtualWalletService } from '../service/virtual-wallet.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/shared/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-wallet',
  templateUrl: './list-wallet.component.html',
  styleUrls: ['./list-wallet.component.scss']
})
export class ListWalletComponent {
 public virtual_walletsList: Array<any> = [];
  @ViewChild('closebutton') closebutton: any;
 private modalError: any;

  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public virtual_wallets_general: any = [];
  public virtual_wallet_selected: any;
  public birthdayBeauty: string = '';
  public user: any;
  public kind_sport: any = [];
  public translations:any = [];


  constructor(public data : DataService, public virtual_walletSrv: VirtualWalletService, public translate: TranslateService, public router: Router){
  }
  ngOnInit() {
    this.user = this.virtual_walletSrv.authSrv.user;
    this.initializeLanguage()
    this.getTableData();
  }


  private getTableData(): void {

    this.virtual_walletsList = [];
    this.serialNumberArray = [];

    this.virtual_walletSrv.listVirtualWallets().subscribe((resp: any) => {
      this.totalData = resp.wallets.length;
      this.virtual_wallets_general = resp.wallets;
      this.getTableDataGeneral();
    });
  }


  initializeLanguage(){
    this.translate.use(this.virtual_walletSrv.authSrv.language);
    this.translate.setDefaultLang(this.virtual_walletSrv.authSrv.language);

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
    this.virtual_walletsList = [];
    this.serialNumberArray = [];

    this.virtual_wallets_general.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.virtual_walletsList.push(res);
        res.birthday =  pipe.transform(res.birthday, 'dd/MM/yyyy');
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<any>(this.virtual_walletsList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.virtual_walletsList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.virtual_walletsList.slice();

    if (!sort.active || sort.direction === '') {
      this.virtual_walletsList = data;
    } else {
      this.virtual_walletsList = data.sort((a, b) => {
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

  selectvirtual_wallet( virtual_wallet:any){
    this.virtual_wallet_selected = virtual_wallet;
  }

  removevirtual_wallet(){
      this.virtual_walletSrv.deleteVirtualWallet(this.virtual_wallet_selected.id).subscribe( (resp:any) => {
        if( resp.message == 200){
          let index = this.virtual_walletsList.findIndex((item:any) => item.id == this.virtual_wallet_selected.id);
          if(index != -1){
            this.virtual_walletsList.splice(index, 1);
            this.closebutton.nativeElement.click();
            this.virtual_wallet_selected = null;
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


  openWallet(wallet_id: string){
    this.router.navigate(['/wallet/list-wallet/edit', wallet_id]);
  }

}
