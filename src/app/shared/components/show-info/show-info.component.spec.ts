import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInfoComponent } from './show-info.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {CrudService} from "../../../core/services/crud/crud.service";
import {AlertService} from "../../../core/services/alert/alert.service";

fdescribe('ShowInfoComponent', () => {
  let component: ShowInfoComponent;
  let fixture: ComponentFixture<ShowInfoComponent>;

  beforeEach(async () => {
    const crudServiceSpy = jasmine.createSpyObj('CrudService', ['addPlayer', 'updatePlayer', 'showProductCart', 'deletePlayer']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['showToasterFull', 'showToasterError', 'showToasterWarning']);

    await TestBed.configureTestingModule({
      imports: [
        ShowInfoComponent,
        MatDialogModule,
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

    fixture = TestBed.createComponent(ShowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
