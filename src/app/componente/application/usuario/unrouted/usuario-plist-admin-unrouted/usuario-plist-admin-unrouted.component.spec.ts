import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsuarioPlistAdminUnRoutedComponent } from './usuario-plist-admin-unrouted.component';

describe('UsuarioPlistAdminRoutedComponent', () => {
  let component: UsuarioPlistAdminUnRoutedComponent;
  let fixture: ComponentFixture<UsuarioPlistAdminUnRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPlistAdminUnRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPlistAdminUnRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
