import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentaPlistAdminUnRoutedComponent } from './tipocuenta-plist-admin-unrouted.component';

describe('UsertypePlistAdminRoutedComponent', () => {
  let component: TipoCuentaPlistAdminUnRoutedComponent;
  let fixture: ComponentFixture<TipoCuentaPlistAdminUnRoutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCuentaPlistAdminUnRoutedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCuentaPlistAdminUnRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
