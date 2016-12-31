/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VenderComponent } from './vender.component';

describe('VenderComponent', () => {
  let component: VenderComponent;
  let fixture: ComponentFixture<VenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
