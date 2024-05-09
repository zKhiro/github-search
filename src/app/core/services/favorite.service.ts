import { Injectable } from '@angular/core';
import { ObjectModel } from '@models/generic.model';
import { UserResultCardModel } from '@models/user.model';

import { LS_FAVORITE } from '../utils/endpoints.util';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  addToFavorites(user: UserResultCardModel) {
    let userToAdd = { [user.username]: user };

    if(localStorage.getItem(LS_FAVORITE)) {
      userToAdd = {
        ...JSON.parse(localStorage.getItem(LS_FAVORITE)!),
        ...userToAdd,
      };
    }

    localStorage.setItem(LS_FAVORITE, JSON.stringify(userToAdd));
  }

  removeFromFavorites(username: string) {
    const users = this.getLocalStorage();
    delete users[username];

    localStorage.setItem(LS_FAVORITE, JSON.stringify(users));
  }

  getAllFavorites(): ObjectModel<UserResultCardModel> {
    return JSON.parse(localStorage.getItem(LS_FAVORITE)!);
  }

  getFavorite(username: string): UserResultCardModel | null {
    const user = this.getLocalStorage()[username];
    return user;
  }

  private getLocalStorage(): ObjectModel<UserResultCardModel> {
    return JSON.parse(localStorage.getItem(LS_FAVORITE)!) as ObjectModel<UserResultCardModel> || {};
  }
}
