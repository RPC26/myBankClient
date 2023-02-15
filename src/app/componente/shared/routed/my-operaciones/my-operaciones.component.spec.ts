import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOperacionesComponent } from './my-operaciones.component';

describe('MyOperacionesComponent', () => {
  let component: MyOperacionesComponent;
  let fixture: ComponentFixture<MyOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
