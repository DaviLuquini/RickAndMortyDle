import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSearch } from './character-search';

describe('CharacterSearch', () => {
  let component: CharacterSearch;
  let fixture: ComponentFixture<CharacterSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
