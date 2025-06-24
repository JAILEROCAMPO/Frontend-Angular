import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitroUsuarioComponent } from './regitro-usuario.component';

describe('RegitroUsuarioComponent', () => {
  let component: RegitroUsuarioComponent;
  let fixture: ComponentFixture<RegitroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegitroUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegitroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
