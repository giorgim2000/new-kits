import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOrdersGridComponent } from './users-orders-grid.component';

describe('UsersOrdersGridComponent', () => {
  let component: UsersOrdersGridComponent;
  let fixture: ComponentFixture<UsersOrdersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersOrdersGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersOrdersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
