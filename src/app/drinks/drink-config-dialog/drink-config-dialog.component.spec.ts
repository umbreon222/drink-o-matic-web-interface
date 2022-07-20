import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkConfigDialogComponent } from './drink-config-dialog.component';

describe('DrinkConfigComponent', () => {
  let component: DrinkConfigDialogComponent;
  let fixture: ComponentFixture<DrinkConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
