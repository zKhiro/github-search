import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserResultCardModel } from '@models/user.model';


@Component({
  selector: 'app-user-result-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './user-result-card.component.html',
  styleUrl: './user-result-card.component.scss'
})
export class UserResultCardComponent {
  @Input() user: UserResultCardModel;
  @Input() isSelected: boolean;

  @Output() clickButton = new EventEmitter<void>();
}
