import { map, Subscription, tap } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormRecord } from '@angular/forms';
import { UserResultCardModel } from '@models/user.model';
import { FavoriteService } from '@services';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favorites: UserResultCardModel[] = [];
  favoritesToShow: UserResultCardModel[] = [];

  techFilterForm = new FormRecord<FormControl<boolean>>({});
  techs: Set<string> = new Set();

  techFilterFormChanges: Subscription;


  constructor(private readonly favoriteService: FavoriteService) {}

  ngOnInit() {
    this.setFavorites();

    this.listenToTechFilterFormChanges();
  }

  ngOnDestroy() {
    this.techFilterFormChanges.unsubscribe();
  }

  private setFavorites() {
    Object.entries(this.favoriteService.getAllFavorites() || {}).forEach(users => {
      this.favorites.push(users[1]);

      Array.from(users[1].techs.keys()).forEach(tech => {
        this.techFilterForm.addControl(tech, new FormControl(false, { nonNullable: true }));

        this.techs.add(tech);
      });
    });

    this.techs = new Set([...this.techs].sort());

    this.favoritesToShow = this.favorites;
  }

  private listenToTechFilterFormChanges() {
    this.techFilterFormChanges = this.techFilterForm.valueChanges.pipe(
      map(valuesChanged => {
        return Object.keys(valuesChanged).filter(valueChanged => valuesChanged[valueChanged]);
      }),
      tap(valuesChanged => {
        if(!valuesChanged.length) {
          this.favoritesToShow = this.favorites;

          return;
        }

        this.favoritesToShow = this.favorites.filter(favorite => {
          return !!valuesChanged.every(techFiltered => favorite.techs.get(techFiltered));
        });
      }),
    ).subscribe();
  }
}
