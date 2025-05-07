import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './common-component/header/header.component';
import { SidebarComponent } from './common-component/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PermisionInterceptorInterceptor } from './permision-interceptor.interceptor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeHeaderComponent } from './common-component/home-header/home-header.component';
import { TimeAgoMemberPipe } from './pipe/time-ago-member.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SpinnerComponent } from './loader/spinner/spinner.component';
import { LoadingInterceptor } from './loader/loading.interceptor';
//import { ClubInfoComponent } from './common-component/club-info/club-info.component';



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  //  ClubInfoComponent,
    //HomeHeaderComponent,
    //HeaderComponent,
    //SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    SlickCarouselModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PermisionInterceptorInterceptor,
      multi: true
    },
    /*
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoadingInterceptor, 
      multi: true
    },*/
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
