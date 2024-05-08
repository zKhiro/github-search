import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IconUserComponent } from '../../icons/icon-user/icon-user.component';
import { BaseInput } from '../base-input.class';


@Component({
  selector: 'app-input-toggle-button',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    IconUserComponent,
  ],
  templateUrl: './input-toggle-button.component.html',
  styleUrl: './input-toggle-button.component.scss'
})
export class InputToggleButtonComponent extends BaseInput {}
