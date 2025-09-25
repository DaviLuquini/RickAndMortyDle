import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintCard } from './hint-card';

describe('HintCard', () => {
  let component: HintCard;
  let fixture: ComponentFixture<HintCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HintCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HintCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
