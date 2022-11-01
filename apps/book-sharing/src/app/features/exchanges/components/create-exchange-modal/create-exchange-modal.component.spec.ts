import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExchangeModalComponent } from './create-exchange-modal.component';

describe('CreateExchangeModalComponent', () => {
  let component: CreateExchangeModalComponent;
  let fixture: ComponentFixture<CreateExchangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExchangeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExchangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
