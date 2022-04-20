import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsmodalComponent } from './componentsmodal.component';

describe('ComponentsmodalComponent', () => {
  let component: ComponentsmodalComponent;
  let fixture: ComponentFixture<ComponentsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
