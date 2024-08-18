import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsmanagmentComponent } from './productsmanagment.component';

describe('ProductsmanagmentComponent', () => {
  let component: ProductsmanagmentComponent;
  let fixture: ComponentFixture<ProductsmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsmanagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
