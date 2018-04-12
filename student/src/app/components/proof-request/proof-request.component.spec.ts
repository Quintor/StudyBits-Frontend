import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofRequestComponent } from './proof-request.component';

describe('ProofRequestComponent', () => {
  let component: ProofRequestComponent;
  let fixture: ComponentFixture<ProofRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProofRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
