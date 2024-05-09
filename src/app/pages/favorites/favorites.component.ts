import { Component, OnInit } from '@angular/core';
import { UserResultCardModel } from '@models/user.model';
import { FavoriteService, UserDetailService } from '@services';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {

  favorites: UserResultCardModel[] = [];


  constructor(
    private readonly userDetailService: UserDetailService,
    private readonly favoriteService: FavoriteService,
  ) {}

  ngOnInit() {
    Object.entries(this.favoriteService.getAllFavorites()).forEach(users => {
      this.favorites.push(users[1]);
    });
  }

  openDetail(favorite: UserResultCardModel) {
    this.userDetailService.open
  }
}
