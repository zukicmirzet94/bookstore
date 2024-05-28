import { Component } from '@angular/core';
import { Book } from 'src/app/utils/interfaces';
import { Store } from '@ngrx/store';
import { selectionBookSelector } from 'src/app/state/books/books.selectors';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { BookService } from 'src/app/services/book.service';
import { BooksActions } from 'src/app/state/books/books.actions';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  public selectedBook: Book = {};
  public isOpenedBookActions = false;
  public selectedBook$ = this.store.select(selectionBookSelector);
  public bookSubscription = new Subscription();

  constructor(private store: Store, private confirmationService: ConfirmationService, private bookService: BookService) { }

  ngOnInit() {
    this.bookSubscription = this.selectedBook$.subscribe(book => {
      this.selectedBook = book;
    })
  }

  deleteBook() {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${this.selectedBook.name}?`,
      header: 'Delete Book',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedBook.id) {
          this.bookService.deleteBook(this.selectedBook.id).subscribe(isDeleted => {
            this.store.dispatch(BooksActions.deleteBook({ bookId: this.selectedBook.id || '' }))
          });
        }
      }
    });
  }

  closeBookActions() {
    if (this.isOpenedBookActions) {
      this.selectedBook = {};
      this.isOpenedBookActions = false
    }
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
