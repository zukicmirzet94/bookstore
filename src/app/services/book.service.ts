import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../utils/interfaces';
import { SearchType } from '../utils/enums';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient: HttpClient) { }

  getBooks(searchValue: string = '', type: SearchType): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.BASE_URL}/books?${type}=${searchValue}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${environment.BASE_URL}/books`, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${environment.BASE_URL}/books/${book.id}`, book);
  }

  deleteBook(bookId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${environment.BASE_URL}/books/${bookId}`);
  }

}
