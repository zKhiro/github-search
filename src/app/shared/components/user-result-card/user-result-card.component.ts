import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { UserResultCardModel } from '@models/user.model';
import { UserDetailService } from '@services';

import { BtnFavoriteComponent } from '../btn-favorite/btn-favorite.component';


@Component({
  selector: 'app-user-result-card',
  standalone: true,
  imports: [
    CommonModule,

    BtnFavoriteComponent,
  ],
  templateUrl: './user-result-card.component.html',
  styleUrl: './user-result-card.component.scss'
})
export class UserResultCardComponent {
  @Input() user: UserResultCardModel;
  @Input() isSelected: boolean;

  @Output() clickButton = new EventEmitter<void>();

  @HostBinding('class') classes = 'position-relative';


  constructor(private userDetailService: UserDetailService) {}

  openDetails() {
    if(this.user.username === this.userDetailService.content?.username && this.userDetailService.isOpen) {
      return;
    }

    this.userDetailService.open(this.user);
  }
}
