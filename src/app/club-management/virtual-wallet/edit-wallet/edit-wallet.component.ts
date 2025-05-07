import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { VirtualWalletService } from '../service/virtual-wallet.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.scss']
})
export class EditWalletComponent {
    @ViewChild('closebutton') closebutton: any;
    public routes = routes;
    public selectedValue !: string;
    public name: string = '';
    public surname: string = '';
    public mobile: string = '';
    public amount: number = 0;
    public wallet_id:string = '';
    public wallet_selected:any;
    public spents: any = [];
  
  
    public success_message_member : string = '';
    public error_message: string = '';
    public isLoaded: boolean = false;
    public can_edit:boolean = false;
    public rolsAdded: any = [];
    public negative_amount_message: string = '';
  
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
    public spent_selected: any;

    public is_new_wallet: boolean = false;
      
  
    constructor( public walletSrv: VirtualWalletService, public translate: TranslateService, public activateRoute: ActivatedRoute ){}
  
    ngOnInit(): void {
      this.initializeLanguage();
      this.user = this.walletSrv.authSrv.user;
      this.hasPermission();
      this.activateRoute.params.subscribe( (resp:any) => {
        this.wallet_id = resp.id;
        if( resp.is_new && this.spents.length == 0){
          this.is_new_wallet = true;
        }
        this.getWalletSelected();
      });
    }
  
  
    getWalletSelected(){
      this.walletSrv.getWallet(this.wallet_id).subscribe( (resp:any) => {
        this.wallet_selected = resp.wallet;
        this.spents = resp.spents;
        this.name = this.wallet_selected.name;
        this.surname = this.wallet_selected.surname;
        this.mobile = this.wallet_selected.mobile;
        this.amount = this.wallet_selected.amount;
        this.isLoaded = true;
      });
    }
   
    initializeLanguage(){
      this.translate.use(this.walletSrv.authSrv.language);
      this.translate.setDefaultLang(this.walletSrv.authSrv.language);
    
      this.translate.get(['commun_translations', 'members.members_messages', 'club_translations', 'wallet'])
      .subscribe((resp:any) => {
        this.translations = resp;
        if( this.is_new_wallet){
          this.success_message_member = this.translations['wallet'].recharge_added;;
        }
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
      formData.append('amount', this.amount.toString());
      
  
  
      this.walletSrv.updateWallet( this.wallet_id, formData).subscribe( (resp:any ) => {
  
        if( resp.message == 200){
            this.error_message = '';
            this.success_message_member  = this.translations['commun_translations'].data_save_correctly;
            this.wallet_id = resp.member.id;
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

    addSpent(){
  
      if( this.info_new_spent == '' ){
        this.error_message_popup = this.translations['wallet'].notice_1;
        return;
      }
  
      if( this.amount_new_spent == 0 || this.amount_new_spent == null ){
        this.error_message_popup = this.translations['wallet'].notice_2;
        return;
      }
     
      let formData = new FormData();
      formData.append('virtual_wallet_id', this.wallet_id);
      formData.append('info', this.info_new_spent);
      formData.append('is_recharge', '0');
      formData.append('amount', this.amount_new_spent.toString());

      this.walletSrv.addSpent( formData ).subscribe( (resp:any) => {
        this.error_message_popup = '';
        this.error_message = '';
        this.susccess_message_popup = '';
        this.negative_amount_message = '';
        this.message_errors = [];
        if( resp.message == 200){
          this.amount = resp.current_amount;
          if( this.amount < 0){
            this.negative_amount_message = this.translations['wallet'].amount_negative;
          }
          this.susccess_message_popup = this.translations['commun_translations'].data_save_correctly;
          this.spents.unshift(resp.new_spent_wallet);
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].data_save_error;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
      })
    }

    addRecharge(){

      if( this.amount_new_spent == 0 || this.amount_new_spent == null ){
        this.error_message_popup = this.translations['wallet'].notice_2;
        return;
      }

      let formData = new FormData();
      formData.append('virtual_wallet_id', this.wallet_id);
      formData.append('info', this.translations['wallet'].recharge);
      formData.append('is_recharge', '1');
      formData.append('amount', this.amount_new_spent.toString());
     
      this.walletSrv.addRecharge( formData ).subscribe( (resp:any) => {
        this.susccess_message_popup = '';
        this.error_message = '';
        this.message_errors = [];
        this.negative_amount_message = '';
        if( resp.message == 200){
          this.amount = resp.current_amount;
          this.susccess_message_popup = this.translations['commun_translations'].data_save_correctly;
          this.spents.unshift(resp.new_spent_wallet);
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].data_save_error;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
      })

    }

    openPopup(){
      this.amount_new_spent = 0;
      this.info_new_spent = '';
      this.error_message_popup = '';
      this.susccess_message_popup = '';
      this.message_errors = [];
      this.negative_amount_message = '';
    }

    closPopup(){
      this.info_new_spent = '';
      this.amount_new_spent = 0;
      this.susccess_message_popup = '';
      this.error_message = '';
      this.message_errors = [];
      this.negative_amount_message = '';
    }

    selectSpent(spent: any){
      this.spent_selected = spent;
    }

    removeSpent(){
      this.walletSrv.removeSpent( this.spent_selected.id ).subscribe( (resp:any) => {

        if( resp.message == 200){
          let index = this.spents.findIndex((item:any) => item.id == this.spent_selected.id);
          if(index != -1){
            this.spents.splice(index, 1);
            this.amount = resp.current_amount_wallet;
            this.closebutton.nativeElement.click();
            this.spent_selected = null;
          }
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].data_save_error;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
      })
    }

}
