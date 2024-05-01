import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsByYearComponent } from './models-by-year.component';

describe('ModelsByYearComponent', () => {
  let component: ModelsByYearComponent;
  let fixture: ComponentFixture<ModelsByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsByYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelsByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
