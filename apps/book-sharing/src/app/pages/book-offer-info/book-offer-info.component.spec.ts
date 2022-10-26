import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfferInfoComponent } from './book-offer-info.component';

describe('BookOfferInfoComponent', () => {
  let component: BookOfferInfoComponent;
  let fixture: ComponentFixture<BookOfferInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookOfferInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookOfferInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
