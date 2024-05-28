import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../utils/interfaces';
import { BookType } from '../utils/enums';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileSelectEvent, FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { Store } from '@ngrx/store';
import { BookService } from '../services/book.service';
import { BooksActions } from '../state/books/books.actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getRandomNum } from '../utils/helpers';

@Component({
  selector: 'app-book-actions',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ButtonModule, FloatLabelModule, InputTextareaModule, FileUploadModule],
  templateUrl: './book-actions.component.html',
  styleUrl: './book-actions.component.scss',
})
export class BookActionsComponent {
  @Input() selectedBook: Book = {};
  @Output() close = new EventEmitter<void>();
  public selectedFile: File | null = null;
  public selectedFileUrl: SafeResourceUrl | null = null;
  constructor(private formBuilder: FormBuilder, 
              private store: Store, 
              private bookService: BookService,
              private sanitizer: DomSanitizer
  ) { }

  public bookForm = this.formBuilder.group<Book>({
    id: '',
    name: '',
    author: '',
    description: '',
    year: 2024,
    type: BookType.KIDS,
    image: ''
  });

  ngOnInit() {
    if (this.selectedBook && this.selectedBook.id) {
      this.bookForm.patchValue(this.selectedBook);
      if (this.selectedBook.image && this.selectedBook.image.length > 0) {
        this.selectedFileUrl = this.getImageUrl(this.selectedBook.image);
      }
    }
  }

  saveBook() {
    const bookId: string = this.bookForm.get('id')?.value || '';
    if (bookId && bookId.length > 0) {
      this.updateBook();
    } else {
      this.createBook();
    }
  }

  createBook() {
    let body: Book = this.bookForm.getRawValue();
    body.id = getRandomNum();
    this.bookService.createBook(body).subscribe(createdBook => {
      if (createdBook) {
        this.store.dispatch(BooksActions.actionBook({ book: createdBook }))
        this.close.emit();
      }
    })
  }

  updateBook() {
    let body: Book = this.bookForm.getRawValue();
    this.bookService.updateBook(body).subscribe(updatedBook => {
      if (updatedBook) {
        this.store.dispatch(BooksActions.actionBook({ book: updatedBook }))
        this.close.emit();
      }
    })
  }

  getImageUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  onSelectFile(event: FileSelectEvent) {
    const file = event.currentFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFileUrl = reader.result?.toString() || '';
      this.bookForm.patchValue({
        image: reader.result?.toString()
      });
    };
  }
}
