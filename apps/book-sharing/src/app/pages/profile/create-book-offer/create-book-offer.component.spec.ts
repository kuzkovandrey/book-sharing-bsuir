import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookOfferComponent } from './create-book-offer.component';

describe('CreateBookOfferComponent', () => {
  let component: CreateBookOfferComponent;
  let fixture: ComponentFixture<CreateBookOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBookOfferComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBookOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
