import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuessResultComponent } from './guess-result';

describe('GuessResultComponent', () => {
  let component: GuessResultComponent;
  let fixture: ComponentFixture<GuessResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
