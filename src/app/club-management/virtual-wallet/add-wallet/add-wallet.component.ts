import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { VirtualWalletService } from '../service/virtual-wallet.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss']
})
export class AddWalletComponent {
  @ViewChild('closebutton') closebutton: any;
  public routes = routes;
  public selectedValue !: string;
  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public amount: number = 0;
  public wallet_id:string = '';

  public success_message_member : string = '';
  public error_message: string = '';
  public isLoaded: boolean = false;
  public can_edit:boolean = false;
  public rolsAdded: any = [];

  public user: any;
  public translations:any = [];
  public message_errors: any = [];
  public message_errors_member:any = [];
  public error_message_member: string = '';

  public new_spent: any;
  public info_new_spent: string = '';
  public amount_new_spent: number = 0;
  public error_message_popup:string = '';
  public susccess_message_popup:string = '';
  public spents: any = [];

  constructor( public walletSrv: VirtualWalletService, public translate: TranslateService, public router: Router ){}

  ngOnInit(): void {
    this.initializeLanguage();
    this.user = this.walletSrv.authSrv.user;
    this.hasPermission();
 }


 
 initializeLanguage(){
  this.translate.use(this.walletSrv.authSrv.language);
  this.translate.setDefaultLang(this.walletSrv.authSrv.language);

  this.translate.get(['commun_translations', 'members.members_messages', 'club_translations'])
  .subscribe((resp:any) => {
    this.translations = resp;
  }); 
}

  hasPermission( permision: string = ''){
    if(this.user.role.includes('Super-Admin')){
      this.can_edit = true;
      return true;
    }

    if(this.user.permissions.includes(permision) ){
      this.can_edit = true;
      return true;
    }

    return false;
  }


  
  cleanMessage(){
    this.error_message = '';
    this.success_message_member = '';
    this.error_message_member = '';
    this.message_errors_member = [];
  }

  


  save(){

    
    this.cleanMessage();
    
    if( this.name == '' ){
      this.error_message_member = this.translations["members.members_messages"].error_name_1;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message_member = this.translations["members.members_messages"].error_name_1;
      return;
    }

    if( this.surname == '' ){
      this.error_message_member = this.translations["members.members_messages"].error_surname_1;
      return;
    }
    
    if( this.surname && this.surname.length > 191){
      this.error_message_member = this.translations["members.members_messages"].error_surname_2;
      return;
    }

    if( this.mobile == '' ){
      this.error_message_member = this.translations["members.members_messages"].error_mobile_1;
      return;
    }
    
    if( this.mobile && this.mobile.length > 50){
      this.error_message_member = this.translations["members.members_messages"].error_mobile_2;
      return;
    }



    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    


    this.walletSrv.storeWallet( formData).subscribe( (resp:any ) => {

      if( resp.message == 200){
          this.error_message = '';
          this.success_message_member  = this.translations['commun_translations'].data_save_correctly;
          this.wallet_id = resp.wallet.id;
      }else if(resp.message == 422) {
          this.error_message_member = this.translations['commun_translations'].data_save_error ;
          this.message_errors_member = resp.errors_text;
      }else if(resp.message == 403) {    
          this.error_message_member = this.translations["members.members_messages"].exist_member  + ' ' + resp.member.name + ' ' + resp.member.surname;
      } else {
          this.error_message_member = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }

    });

  }


  addRecharge(){

    if( this.amount_new_spent == 0 || this.amount_new_spent == null ){
      this.error_message_popup = 'Introduce cuantía';
      return;
    }

    let formData = new FormData();
    formData.append('virtual_wallet_id', this.wallet_id);
    formData.append('info', 'Recarga');
    formData.append('is_recharge', '1');
    formData.append('amount', this.amount_new_spent.toString());
   
    this.walletSrv.addRecharge( formData ).subscribe( (resp:any) => {

      if( resp.message == 200){
        this.closebutton.nativeElement.click();
        this.amount = resp.current_amount;
        this.susccess_message_popup = this.translations['commun_translations'].data_save_correctly;
        this.spents.unshift(resp.new_spent_wallet);
        this.router.navigate(['/wallet/list-wallet/edit', this.wallet_id, '1']);
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })

  }
  

  openPopup(){}

  closPopup(){
    this.info_new_spent = '';
    this.amount_new_spent = 0;
    this.susccess_message_popup = '';
    this.error_message = '';
    this.message_errors = [];
    this.router.navigate(['/wallet/list-wallet/edit', this.wallet_id]);
  }

}
