import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IconUserComponent } from '../../icons/icon-user/icon-user.component';
import { BaseInput } from '../base-input.class';


@Component({
  selector: 'app-input-button-toggle',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    IconUserComponent,
  ],
  templateUrl: './input-button-toggle.component.html',
  styleUrl: './input-button-toggle.component.scss'
})
export class InputButtonToggleComponent extends BaseInput {}
