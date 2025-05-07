import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { PlayerService } from '../service/player.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {

  public routes = routes;
  public virtual_wallets: any = [];
  public spents_wallet: any = [];
  public loaded: boolean = false;
 
  constructor(public playerSrv: PlayerService, public translate: TranslateService){}

  ngOnInit(): void {

    this.translate.setDefaultLang(this.playerSrv.authSrv.language);
    this.translate.use(this.playerSrv.authSrv.language);

    this.playerSrv.getlWallets().subscribe( (resp:any) => {
      this.virtual_wallets = resp.wallets;
      this.loaded = true;
    })

  }

  viewHistory(history:any)
  {
    this.spents_wallet = history;
  }

  closeHistoric(){
    this.spents_wallet = [];
  }

}
