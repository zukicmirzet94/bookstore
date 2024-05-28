import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';
import { TableModule } from 'primeng/table';
import { Book } from '../utils/interfaces';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { BooksApiActions, SelectBookAction } from '../state/books/books.actions';
import { actionsBook, selectBooks} from '../state/books/books.selectors';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, debounceTime, map } from 'rxjs';
import { SearchType } from '../utils/enums';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, DialogModule, RadioButtonModule, InputTextModule, BookDetailsComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  public books$ = this.store.select(selectBooks);
  public actionsBook$ = this.store.select(actionsBook);
  public isOpenedDialog = false;
  public selectedBook: Book = {};
  public searchValue = '';
  public searchChanged: Subject<string> = new Subject<string>();
  public refre: Subscription = new Subscription();
  public searchType: SearchType = SearchType.NAME;
  public searchSubscription: Subscription = new Subscription();
  public actionsBookSubscription: Subscription = new Subscription();
  public isViewingDetails = false;
  constructor(private bookService: BookService, private store: Store) {
    this.searchSubscription = this.searchChanged.pipe(
      debounceTime(500))
      .subscribe((value: string) => {
        this.getBooks(value)
      });
      this.actionsBookSubscription = this.actionsBook$.subscribe(actionBook => {
        this.books$ = this.books$.pipe(map(books => { 
        if (typeof actionBook !== 'string') {
          // Create/Update Action
          if (actionBook && actionBook.id && actionBook.id.length > 0) {
              let foundIndexOfBook = books.findIndex(book => book.id === actionBook.id);
              if (foundIndexOfBook > -1) {
                const updatedBooks = [...books];
                updatedBooks[foundIndexOfBook] = actionBook;
                return updatedBooks; 
              } else {
                return [...books, actionBook];
              }
            }  else {
              return books;
            }
          } else {
            // Delete Action
            return books.filter((book) => book.id !== actionBook)
          }
        }))
      })
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(searchValue = '') {
    this.bookService.getBooks(searchValue, this.searchType).subscribe(books => {
      if (books) {
        this.store.dispatch(BooksApiActions({ books }))
      }
    })
  }


  viewBookDetails(book: Book) {
    this.selectedBook = book;
    this.isOpenedDialog = true;
  }

  selectBookRow() {
    if (!this.selectedBook) {
      this.isOpenedDialog = false;
    }
    this.store.dispatch(SelectBookAction({ book: this.selectedBook }))
  }

  search() {
    this.searchChanged.next(this.searchValue);
  }

  closeBookDetails() {
    this.selectedBook = {};
    console.log(this.selectedBook)
    this.isOpenedDialog = false;
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.actionsBookSubscription.unsubscribe();
  }
}
