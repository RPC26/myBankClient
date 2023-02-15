import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDatosComponent } from './my-datos.component';

describe('MyDatosComponent', () => {
  let component: MyDatosComponent;
  let fixture: ComponentFixture<MyDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
