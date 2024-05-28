import { createAction, createActionGroup, props } from '@ngrx/store';
import { Book } from 'src/app/utils/interfaces';

export const BooksActions = createActionGroup({
  source: 'Books Actions',
  events: {
    'Action Book': props<{ book: Book }>(),
    'Delete Book': props<{ bookId: string }>(),
  },
});

export const BooksApiActions = createAction(
  'Books API',
  props<{ books: Book[] }>()
);

export const SelectBookAction = createAction(
  'Select Book',
  props<{ book: Book }>()
);