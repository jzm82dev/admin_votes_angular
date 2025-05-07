import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { TranslateService } from '@ngx-translate/core';
import { ClubService } from './services/club.service';

interface ScheduleDay {
  day_id: string;
  day_name: string;
  closed: boolean;
  hours: any[]
}


@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent {
}
