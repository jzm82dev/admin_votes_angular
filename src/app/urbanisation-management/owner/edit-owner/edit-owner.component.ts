import { Component, ViewChild } from '@angular/core';
import { OwnerService } from '../service/owner.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.scss']
})
export class EditOwnerComponent {

  @ViewChild('closebutton') closebutton: any;
  
  public routes = routes;

  public owner_id: string = '';
  public owner_selected: any;
  public name: string = '';
  public urbanisation_id: string = '';
  public building: string = '';
  public floor: string = '';
  public letter: string = '';
  public total_coefficient: string = '';
  public properties: any = [];
  public urbanisation_name: string = '';
  public property_selected: any;
  public new_property: string = '';
  public new_coefficient: string = '';

  public isLoaded: boolean = false;
  public user: any;

  public error_message: string = '';
  public message_errors: any = [];
  public error_message_popup:string = '';
  public susccess_message_popup:string = '';

  constructor( public ownerSrv: OwnerService, public activateRoute: ActivatedRoute ){}

  ngOnInit(): void {
    this.user = this.ownerSrv.authSrv.user;
    this.activateRoute.params.subscribe( (resp:any) => {
      this.owner_id = resp.id;
      this.getOwnerSelected();
    });
  }

  getOwnerSelected(){
    this.ownerSrv.getOwner(this.owner_id).subscribe( (resp:any) => {
      this.owner_selected = resp.owner;
      this.name = this.owner_selected.name;
      this.urbanisation_id = this.owner_selected.urbanisation_id;
      this.building = this.owner_selected.building;
      this.floor = this.owner_selected.floor;
      this.letter = this.owner_selected.letter;
      this.total_coefficient = this.owner_selected.total_coefficient;
      this.properties = this.owner_selected.properties;
      this.urbanisation_name = this.owner_selected.urbanisation.name;
      this.isLoaded = true;
    });
  }

  openPopup(){
    this.new_property = '';
    this.new_coefficient = '';
    this.error_message_popup = '';
    this.susccess_message_popup = '';
    this.message_errors = [];
  }

  closePopup(){
    this.susccess_message_popup = '';
    this.error_message = '';
    this.message_errors = [];
  }

  cleanMessage(){
    this.error_message = '';
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

  selectProperty(property: any){
    this.property_selected = property;
  }

  removeProperty(){
    this.ownerSrv.removeProperty( this.property_selected.id ).subscribe( (resp:any) => {

      if( resp.message == 200){
        let index = this.properties.findIndex((item:any) => item.id == this.property_selected.id);
        if(index != -1){
          this.properties.splice(index, 1);
          this.total_coefficient = resp.current_total_coefficient;
          this.closebutton.nativeElement.click();
          this.property_selected = null;
        }
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al eliminar la propiedad los datos.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Ha habido un error al eliminar la propiedad los datos. Consulte con el administrador';
      }
    })
  }


  addProperty(){
    if( !this.new_property || !this.new_coefficient  ){
      this.error_message = 'El nombre del inmueble y coeficiente son obligatorios';
      return;
    }

    if( this.new_property && this.new_property.length > 191){
      this.error_message = 'El nombre no puede superar los 191 caracteres';
      return;
    }

    if( this.new_coefficient && this.new_coefficient.length > 10){
      this.error_message = 'El coeficiente no puede superar los 10 caraceteres';
      return;
    }


    let formData = new FormData();
    formData.append('owner_id', this.owner_id);
    formData.append('name',this.new_property);
    formData.append('owner_name','PEPITO GRILLO');
    formData.append('coefficient', this.new_coefficient);
   
    this.ownerSrv.addProperty( formData ).subscribe( (resp:any) => {
      this.susccess_message_popup = '';
      this.error_message = '';
      this.message_errors = [];
      if( resp.message == 200){
        this.total_coefficient = resp.total_coefficient;
        this.susccess_message_popup = 'Inmueble añadido correctamente';
        this.properties.unshift(resp.new_property);
      }else if(resp.message == 422) {
        this.error_message = 'Ha habido un error al añadir la propiedad los datos. Inténtalo nuevamente.';
        this.message_errors = resp.errors_text
      } else {
        this.error_message = 'Ha habido un error al añadir la propiedad los datos. Consulte con el administrador';
      }
    })

  }
  
}
