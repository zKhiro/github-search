import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[appHideBodyScroll]',
  standalone: true
})
export class HideBodyScrollDirective {

  private _appHideBodyScroll: boolean;
  @Input() set appHideBodyScroll(newValue: boolean) {
    this._appHideBodyScroll = newValue;

    this.toggleScroll();
  };
  get appHideBodyScroll(): boolean {
    return this._appHideBodyScroll;
  }


  constructor() { }

  toggleScroll() {
    const body = document.body;
    let inlineStyle: Partial<CSSStyleDeclaration> = {
      overflow: '',
      paddingRight: '',
    };

    if(this.appHideBodyScroll) {
      const scrollbarSize = window.innerWidth - body.offsetWidth;

      inlineStyle = {
        overflow: 'hidden',
        paddingRight: scrollbarSize + 'px',
      };
    }

    Object.assign(body.style, inlineStyle);
  }
}
