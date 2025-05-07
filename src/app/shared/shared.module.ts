import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { materialModule } from './material.module';
import { NgxEditorModule } from 'ngx-editor';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from './data/data.service';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../common-component/header/header.component';
import { HomeHeaderComponent } from '../common-component/home-header/home-header.component';
import { SidebarComponent } from '../common-component/sidebar/sidebar.component';
import { FooterComponent } from '../common-component/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ClubInfoComponent } from '../common-component/club-info/club-info.component';
import { TimeAgoMemberPipe } from '../pipe/time-ago-member.pipe';


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ClubInfoComponent,
    FooterComponent, 
    HomeHeaderComponent,
    TimeAgoMemberPipe
  ],
  imports: [
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      "radius": 40,
      "space": -10,
      "outerStrokeWidth": 10,
      "innerStrokeWidth": 10,
      "animationDuration": 1000,
      "clockwise": false,
      "startFromZero": false,
      "lazy": false,
      "outerStrokeLinecap":"square",
      "showSubtitle": false,
      "showTitle" : false,
      "showUnits" : false,
      "showBackground" : false
    }),
    SlickCarouselModule,
    materialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    RouterModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule,
    materialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent, 
    TranslateModule,
    SlickCarouselModule,
    HomeHeaderComponent,
    ClubInfoComponent
  ],
  providers: [
    DataService,
  ]
})
export class SharedModule { }

