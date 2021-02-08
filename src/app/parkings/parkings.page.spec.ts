import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParkingsPage } from './parkings.page';

describe('ParkingsPage', () => {
  let component: ParkingsPage;
  let fixture: ComponentFixture<ParkingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
