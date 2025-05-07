import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { RolesService } from '../service/roles.service';
import { ActivatedRoute } from '@angular/router';
import { rol } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-edit-role-user',
  templateUrl: './edit-role-user.component.html',
  styleUrls: ['./edit-role-user.component.scss']
})
export class EditRoleUserComponent {
  public routes = routes;

  sideBar: any = [];
  name: string = '';
  permissions: any = [];
  valid_form: boolean = false;
  save_successfully:boolean = false;
  text_validation: string = '';

  role_id: number = 0;
  role_edit: any;
  

  constructor( public dataSrv: DataService, public roleSrv: RolesService, public activateRoute: ActivatedRoute){
  }

  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sideBar = this.dataSrv.sideBar[0].menu;
    this.activateRoute.params.subscribe((resp:any) => {
      this.role_id = resp.id;
      this.showRole();
    })
  }

  showRole(){
    this.roleSrv.showRole( this.role_id ).subscribe( (resp:any) => {
      this.role_edit = resp;
      console.log(this.role_edit);
      this.name = this.role_edit.name;
      this.permissions = this.role_edit.permision_pluck;
    })
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

  update(){
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
    
    this.roleSrv.editRoles(data, this.role_id).subscribe( (resp:any) => {
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }
      else{
        this.save_successfully = true;
      }
    })
  }



}
