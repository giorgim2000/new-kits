import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaSyncComponent } from './fina-sync.component';

describe('FinaSyncComponent', () => {
  let component: FinaSyncComponent;
  let fixture: ComponentFixture<FinaSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinaSyncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinaSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
