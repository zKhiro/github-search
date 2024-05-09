import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EmptyStateComponent, IconPackageComponent, IconSearchComponent, IconUserComponent,
  InputTextComponent, InputToggleButtonComponent, LoadingComponent, PaginatorComponent,
  RepositoryComponent, UserResultCardComponent,
} from '@components';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    HomeRoutingModule,

    UserResultCardComponent,

    EmptyStateComponent,
    LoadingComponent,
    PaginatorComponent,
    RepositoryComponent,

    InputTextComponent,
    InputToggleButtonComponent,

    IconUserComponent,
    IconPackageComponent,
    IconSearchComponent,
  ]
})
export class HomeModule { }
