import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectOptionModel } from '@models/input.model';

import { BaseInput } from '../base-input.class';


@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-select.component.html',
})
export class InputSelectComponent extends BaseInput {
  @Input() options: SelectOptionModel<any>[]
}
