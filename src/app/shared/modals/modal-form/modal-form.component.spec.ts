import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormComponent } from './modal-form.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {AlertService} from "../../../core/services/alert/alert.service";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

fdescribe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;
  let dialogRef: MatDialogRef<ModalFormComponent>;
  let closeSpy: jasmine.Spy;

  beforeEach(async () => {

    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['showToasterFull', 'showToasterError', 'showToasterWarning']);
    closeSpy = jasmine.createSpy('close');

    dialogRef = {
      close: closeSpy
    } as any;


    await TestBed.configureTestingModule({
      imports: [
        ModalFormComponent,
        MatButton,
        BrowserAnimationsModule,
        NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} } // Mock data if needed
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
