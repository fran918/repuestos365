/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VervendedorComponent } from './vervendedor.component';

describe('VervendedorComponent', () => {
  let component: VervendedorComponent;
  let fixture: ComponentFixture<VervendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VervendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VervendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
