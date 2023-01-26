import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOperacionPlistAdminUnRoutedComponent } from './tipooperacion-plist-admin-unrouted.component';

describe('UsertypePlistAdminRoutedComponent', () => {
  let component: TipoOperacionPlistAdminUnRoutedComponent;
  let fixture: ComponentFixture<TipoOperacionPlistAdminUnRoutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOperacionPlistAdminUnRoutedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoOperacionPlistAdminUnRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
