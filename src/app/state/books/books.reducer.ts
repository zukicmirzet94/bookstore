import { createReducer, on } from '@ngrx/store';

import { BooksActions, BooksApiActions, SelectBookAction } from './books.actions';
import { Book } from 'src/app/utils/interfaces';

export const initialState: Book[] = [];
export const selectBookState: Book | string = {} || '';

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions, (_state, { books }) => books),
);

export const bookSelectionReducer = createReducer(
  selectBookState,
  on(SelectBookAction, (_state, { book }) => book)
);

export const bookActionReducer = createReducer(
  selectBookState,
  on(BooksActions.actionBook, (_state, { book }) => { return book; }),
  on(BooksActions.deleteBook, (_state, { bookId }) => { return bookId; }),
);