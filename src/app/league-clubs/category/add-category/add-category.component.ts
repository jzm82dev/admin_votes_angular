import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ClubService } from '../../club/service/club.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  public routes = routes;

  public name: string = '';
  public description: string = '';
  public league_id:string = '';
  public success_message: string = '';
  public error_message: string = '';
  public leagues_list: any = [];       
  public save_ok: boolean = false;                                       

  constructor( public categorySrv: CategoryService){}

  ngOnInit(): void {
    this.categorySrv.config().subscribe( (resp:any) => {
      this.leagues_list = resp.leagues;
    })
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
  }

  
  save(){
    this.cleanMessage();
    
    if( this.name == '' || this.league_id == ''){
      this.error_message = 'El campo nombre y liga son obligatorios';
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('league_id', this.league_id);
   

    this.categorySrv.storeCategory(formData).subscribe( (resp: any) => {
      if( resp.message != 200){
        this.error_message = 'Ha habido un error al guardar la categoría. Consulte a su administrador.';
      }else{
        this.save_ok = true;
        this.success_message = 'Categoría guardada correctamente.';
      }
    })
    
  }

}
