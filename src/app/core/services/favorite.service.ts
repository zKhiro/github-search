import { Injectable } from '@angular/core';
import { ObjectModel } from '@models/generic.model';
import { UserResultCardModel } from '@models/user.model';

import { LS_FAVORITE } from '../utils/endpoints.util';
import { replacer, reviver } from '../utils/json.utils';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  addToFavorites(user: UserResultCardModel) {
    let userToAdd = { [user.username]: user };

    if(localStorage.getItem(LS_FAVORITE)) {
      userToAdd = {
        ...JSON.parse(localStorage.getItem(LS_FAVORITE)!, reviver),
        ...userToAdd,
      };
    }

    localStorage.setItem(LS_FAVORITE, JSON.stringify(userToAdd, replacer));
  }

  removeFromFavorites(username: string) {
    const users = this.getLocalStorage();
    delete users[username];

    localStorage.setItem(LS_FAVORITE, JSON.stringify(users, replacer));
  }

  getAllFavorites(): ObjectModel<UserResultCardModel> {
    return JSON.parse(localStorage.getItem(LS_FAVORITE)!, reviver);
  }

  getFavorite(username: string): UserResultCardModel | null {
    const user = this.getLocalStorage()[username];
    return user;
  }

  private getLocalStorage(): ObjectModel<UserResultCardModel> {
    return JSON.parse(localStorage.getItem(LS_FAVORITE)!, reviver) as ObjectModel<UserResultCardModel> || {};
  }
}
