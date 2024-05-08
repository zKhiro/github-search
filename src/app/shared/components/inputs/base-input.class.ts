import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Directive()
export class BaseInput {
  @Input() control: FormControl;
  @Input() placeholderInput = '';
  @Input() label?: string;
  @Input() disabled?: boolean;
}