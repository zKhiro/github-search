import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authGithubInterceptor } from './core/interceptors';
import { HeaderComponent } from './shared/components/header/header.component';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,

    AppRoutingModule,

    HeaderComponent,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authGithubInterceptor])
    ),
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
