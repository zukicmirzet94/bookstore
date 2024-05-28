import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { selectBooks } from '../state/books/books.selectors';
import { Store } from '@ngrx/store';
import { Book } from '../utils/interfaces';
import { CardModule } from 'primeng/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  @Input() selectedBook: Book = {};
  @Output() closeBookDetails = new EventEmitter<void>();
  public books = this.store.select(selectBooks);
  public imageUrl: SafeResourceUrl = '';
  constructor(private store: Store, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.selectedBook.image) {
      this.imageUrl = this.getImageUrl(this.selectedBook.image);
    }
  }

  getImageUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  cancel() {
    this.closeBookDetails.emit();
  }
}
