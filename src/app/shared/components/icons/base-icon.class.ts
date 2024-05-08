import { Directive, HostBinding, Input } from '@angular/core';


@Directive()
export class BaseIcon {
  @Input() fillColor = 'none';
  @Input() strokeColor = 'currentColor';

  @HostBinding('class') classes = 'd-inline-flex';
}
