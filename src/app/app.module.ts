import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { appReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptor } from './services/auth.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ /* maxAge: 25, */ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
