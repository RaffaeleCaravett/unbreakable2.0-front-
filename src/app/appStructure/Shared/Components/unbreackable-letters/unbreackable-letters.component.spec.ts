import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbreackableLettersComponent } from './unbreackable-letters.component';

describe('UnbreackableLettersComponent', () => {
  let component: UnbreackableLettersComponent;
  let fixture: ComponentFixture<UnbreackableLettersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnbreackableLettersComponent]
    });
    fixture = TestBed.createComponent(UnbreackableLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
