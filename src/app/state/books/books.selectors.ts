import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from 'src/app/utils/interfaces';

export const selectBooks = createFeatureSelector<Book[]>('books');
export const selectBook = createFeatureSelector<Book>('book');
export const actionsBook = createFeatureSelector<Book>('bookAction');
export const deleteBook = createFeatureSelector<string>('bookDelete');

export const searchBooksSelector = createSelector(
  selectBooks,
  (books) => {
    return books
  }
);

export const selectionBookSelector = createSelector(
  selectBook,
  (book) => {
    return book
  }
);

export const actionsBookSelector = createSelector(
  actionsBook,
  (book) => {
    return book
  }
);