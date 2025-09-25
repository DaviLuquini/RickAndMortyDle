import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayButton } from './play-button';

describe('PlayButton', () => {
  let component: PlayButton;
  let fixture: ComponentFixture<PlayButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
