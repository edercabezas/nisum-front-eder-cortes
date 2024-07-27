import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from "./home.component";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {CrudService} from "../../core/services/crud/crud.service";
import {AlertService} from "../../core/services/alert/alert.service";

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const crudServiceSpy = jasmine.createSpyObj('CrudService', ['addPlayer', 'updatePlayer', 'showProductCart', 'deletePlayer']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['showToasterFull', 'showToasterError', 'showToasterWarning']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientModule
      ],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
