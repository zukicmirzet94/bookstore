import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { bookActionReducer, bookSelectionReducer, booksReducer } from './state/books/books.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideHttpClient(), provideAnimations(), provideStore(),
    provideState({ name: 'books', reducer: booksReducer }),
    provideState({ name: 'book', reducer: bookSelectionReducer }),
    provideState({ name: 'bookAction', reducer: bookActionReducer }),
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter
          },
      }),
  ),
  ],
};
