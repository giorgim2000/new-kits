import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelGridComponent } from './product-model-grid.component';

describe('ProductModelGridComponent', () => {
  let component: ProductModelGridComponent;
  let fixture: ComponentFixture<ProductModelGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModelGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductModelGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
