import { Component, Input } from '@angular/core';

import { BaseIcon } from '../base-icon.class';


@Component({
  selector: 'app-icon-listright',
  standalone: true,
  imports: [],
  templateUrl: './icon-listright.component.html',
})
export class IconListrightComponent extends BaseIcon {
  @Input() animated = true;
}
