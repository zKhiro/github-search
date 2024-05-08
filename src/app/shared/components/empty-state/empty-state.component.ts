import { Component, HostBinding } from '@angular/core';

import { IconGroupComponent } from '../icons/icon-group/icon-group.component';


@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [ IconGroupComponent ],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  @HostBinding('class') classes = 'flex-column flex-center gap-3';
}
