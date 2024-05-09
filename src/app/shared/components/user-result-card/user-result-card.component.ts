import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { UserResultCardModel } from '@models/user.model';
import { UserDetailService } from '@services';

import { ButtonFavoriteComponent } from '../button-favorite/button-favorite.component';


@Component({
  selector: 'app-user-result-card',
  standalone: true,
  imports: [
    CommonModule,

    ButtonFavoriteComponent,
  ],
  templateUrl: './user-result-card.component.html',
  styleUrl: './user-result-card.component.scss'
})
export class UserResultCardComponent {
  private _user: UserResultCardModel;
  @Input() set user(newValue: UserResultCardModel) {
    this._user = newValue;

    this.techs = Array.from(this._user.techs.keys());
  };
  get user(): UserResultCardModel { return this._user; }

  @Input() isSelected: boolean;

  @Output() clickButton = new EventEmitter<void>();

  @HostBinding('class') classes = 'position-relative';

  techs: string[];


  constructor(private userDetailService: UserDetailService) {}

  openDetails() {
    if(this.user.username === this.userDetailService.content?.username && this.userDetailService.isOpen) {
      return;
    }

    this.userDetailService.open(this.user);
  }
}
