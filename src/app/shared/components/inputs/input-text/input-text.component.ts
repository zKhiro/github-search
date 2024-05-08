import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseInput } from '../base-input.class';


@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent extends BaseInput {

}
