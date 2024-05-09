import { Component, Input } from '@angular/core';
import { UserResultCardModel } from '@models/user.model';
import { FavoriteService } from '@services';

import { IconBookmarkComponent } from '../icons/icon-bookmark/icon-bookmark.component';


@Component({
  selector: 'app-button-favorite',
  standalone: true,
  imports: [ IconBookmarkComponent ],
  templateUrl: './button-favorite.component.html',
  styleUrl: './button-favorite.component.scss'
})
export class ButtonFavoriteComponent {

  @Input() user: UserResultCardModel;


  constructor(private readonly favoriteServe: FavoriteService) {}

  toggleUserToFavorite() {
    const previousFavoriteValue = this.user.favorite;
    this.user.favorite = !this.user.favorite;

    if(previousFavoriteValue) {
      this.favoriteServe.removeFromFavorites(this.user.username);

    } else {
      this.favoriteServe.addToFavorites(this.user);

    }
  }
}
