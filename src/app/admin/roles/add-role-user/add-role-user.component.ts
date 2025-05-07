import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.scss']
})
export class AddRoleUserComponent {
  public routes = routes;

  sideBar: any = [];
  name: string = '';
  permissions: any = [];
  valid_form: boolean = false;
  save_successfully:boolean = false;
  text_validation: string = '';

  constructor( public dataSrv: DataService, public roleSrv: RolesService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sideBar = this.dataSrv.sideBar[0].menu;
  }

  addPermission( subMenu: any){
    if( subMenu.permision ){
      let index = this.permissions.findIndex((item:any)=>item == subMenu.permision );
      if( index != -1){
        this.permissions.splice(index, 1);
      }else{
        this.permissions.push( subMenu.permision );
      }
      console.log(this.permissions)
    }
  }

  save(){
    this.text_validation = '';
    this.valid_form = false;
    if(!this.name || this.permissions.length == 0){
      this.valid_form = true;
      return;
    }
    let data = {
      name: this.name,
      permissions: this.permissions
    };
    
    this.roleSrv.storeRoles(data).subscribe( (resp:any) => {
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }
      else{
        this.save_successfully = true;
        this.name = '';
        this.permissions = [];
      }
      let side_bar = this.sideBar;
      this.sideBar = [];
      setTimeout(() => {
        this.sideBar = side_bar;
      }, 50);
    })
  }

}
