import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarioPlistAdminRoutedComponent } from './tipousuario-plist-admin-unrouted.component';

describe('UsertypePlistAdminRoutedComponent', () => {
  let component: TipoUsuarioPlistAdminRoutedComponent;
  let fixture: ComponentFixture<TipoUsuarioPlistAdminRoutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoUsuarioPlistAdminRoutedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoUsuarioPlistAdminRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
