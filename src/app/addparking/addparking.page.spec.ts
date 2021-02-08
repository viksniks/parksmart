import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddparkingPage } from './addparking.page';

describe('AddparkingPage', () => {
  let component: AddparkingPage;
  let fixture: ComponentFixture<AddparkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddparkingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddparkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
