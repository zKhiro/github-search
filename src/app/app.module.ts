import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HeaderComponent, UserDetailComponent } from '@components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authGithubInterceptor } from './core/interceptors';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,

    AppRoutingModule,

    HeaderComponent,
    UserDetailComponent,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authGithubInterceptor])
    ),
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
