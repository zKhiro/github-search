import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmptyStateComponent, LoadingComponent, UserResultCardComponent } from '@components';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';


@NgModule({
  declarations: [
    FavoritesComponent,
  ],
  imports: [
    CommonModule,

    FavoritesRoutingModule,

    UserResultCardComponent,
    EmptyStateComponent,
    LoadingComponent,
  ]
})
export class FavoritesModule { }
