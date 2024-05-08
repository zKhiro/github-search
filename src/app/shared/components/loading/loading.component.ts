import { Component } from '@angular/core';

import { IconListrightComponent } from '../icons/icon-listright/icon-listright.component';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ IconListrightComponent ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

}
