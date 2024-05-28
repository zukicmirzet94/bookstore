import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookActionsComponent } from './book-actions.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('BookActionsComponent', () => {
  let component: BookActionsComponent;
  let fixture: ComponentFixture<BookActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookActionsComponent, StoreModule, HttpClientTestingModule],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
