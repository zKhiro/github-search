import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BarChartComponent, EmptyStateComponent, IconPackageComponent, IconSearchComponent,
  IconUserComponent, InputTextComponent, InputToggleButtonComponent, LoadingComponent,
  PaginatorComponent, RepositoryComponent, UserDetailComponent, UserResultCardComponent,
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

    UserDetailComponent,
    UserResultCardComponent,

    BarChartComponent,
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
