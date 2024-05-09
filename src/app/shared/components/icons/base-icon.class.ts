import { Directive, HostBinding, Input } from '@angular/core';


@Directive()
export class BaseIcon {
  @Input() fillColor = 'none';
  @Input() strokeColor = 'currentColor';
  @Input() strokeWidth = 1.5;

  @HostBinding('class') classes = 'd-inline-flex';
}
