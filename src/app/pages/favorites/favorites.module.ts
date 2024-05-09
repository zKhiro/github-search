import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EmptyStateComponent, InputButtonToggleComponent, LoadingComponent, UserResultCardComponent,
} from '@components';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';


@NgModule({
  declarations: [
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FavoritesRoutingModule,

    UserResultCardComponent,
    EmptyStateComponent,
    LoadingComponent,

    InputButtonToggleComponent,
  ]
})
export class FavoritesModule { }
