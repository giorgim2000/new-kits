import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferItemsComponent } from './transfer-items.component';

describe('TransferItemsComponent', () => {
  let component: TransferItemsComponent;
  let fixture: ComponentFixture<TransferItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
