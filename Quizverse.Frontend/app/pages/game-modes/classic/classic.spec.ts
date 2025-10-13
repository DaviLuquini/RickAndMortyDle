import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Classic } from './classic';

describe('Classic', () => {
  let component: Classic;
  let fixture: ComponentFixture<Classic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Classic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Classic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
