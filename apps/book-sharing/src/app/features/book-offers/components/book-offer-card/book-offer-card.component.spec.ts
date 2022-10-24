import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfferCardComponent } from './book-offer-card.component';

describe('BookOfferCardComponent', () => {
  let component: BookOfferCardComponent;
  let fixture: ComponentFixture<BookOfferCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookOfferCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookOfferCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
