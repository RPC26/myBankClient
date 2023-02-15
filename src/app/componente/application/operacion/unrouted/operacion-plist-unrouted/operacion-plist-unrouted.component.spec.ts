import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionPlistUnroutedComponent } from './operacion-plist-unrouted.component';

describe('OperacionPlistUnroutedComponent', () => {
  let component: OperacionPlistUnroutedComponent;
  let fixture: ComponentFixture<OperacionPlistUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionPlistUnroutedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacionPlistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
