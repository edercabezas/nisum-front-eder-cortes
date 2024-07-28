import {Component, inject, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CrudService} from "../../../core/services/crud/crud.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ModalInfoComponent} from "../modal-info/modal-info.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {LoadingComponent} from "../../components/loading/loading.component";

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    NgClass,
    MatInput,
    MatButton,
    MatLabel,
    LoadingComponent,
    NgIf,
    JsonPipe
  ],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent implements OnInit{

  public registerForm!: FormGroup;
  public isDisabled: boolean;
  public loading: boolean;
  public base64String: any = 'assets/img/player/player.png';
  public codePlayer: any;


  crud: CrudService = inject(CrudService);
  alert: AlertService = inject(AlertService);
  formBuilder: FormBuilder = inject(FormBuilder);
  dialog: MatDialog = inject(MatDialog);

  constructor(
    public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInformation: any,) {

    this.isDisabled = false;
    this.loading = false;

  }


  ngOnInit(): void {
    this.init();
    this.getIDPlayer();
    this.setDataEdit();
  }

  /**
   * Metodo para abrir la galeria
   */

  selectPhoto(): void {
    const dataFile: any = document.getElementById('upload-product');
    dataFile.click();
  }

  /**
   * Metodo para obtener la imagen y guardarla en una variable en Base64
   * @param data
   */
  public upload(data: Event): void {

    const input = data.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64String = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Metodo encargado de la creación de registros
   */
  public createRegister(): void{
    this.crud.addPlayer(this.registerForm.value);
    this.onNoClick();
  }

  /**
   * Modal de confirmación antes de crear registro o editarlo
   */
  openCart(): void {
    this.registerForm.controls['photo'].setValue(this.base64String)
    this.registerForm.controls['id'].setValue(this.codePlayer)
    if (!this.registerForm?.valid) {
      this.registerForm.markAllAsTouched();
      this.alert.showToasterWarning('Todos los campos son requeridos para continuar');
      return;
    }
    const message: any = this.dataInformation.option ? 'Quiere editar el registro ' : 'Esta seguro que quiere crear este registro '
    const dialog = this.dialog?.open(ModalInfoComponent, {
      width: '400px',
      height: 'auto',
      data: {
        title: `${message} : ${this.registerForm?.controls['name']?.value} ?`,
        buttons: {
          cancel: 'Cancelar',
          confirm: 'Confirmar'
        },
        item: null
      }
    });

    dialog?.afterClosed()?.subscribe({
      next: (response: any): void => {
        if (response) {
          if (this.dataInformation.option ) {
            this.editRegisterPlayer(this.dataInformation.index);
            return;
          }
          this.createRegister();
        }
      }
    });

  }

  /**
   * Funcion que se llama para editar los datos
   * @param index
   */
  public editRegisterPlayer(index: number): void {
    this.onNoClick();
    this.crud.updatePlayer(this.registerForm.value, index);

  }

  /**
   * Metodo apra cerrar el modal el formulario
   */
  onNoClick(): void {
    this.dialogRef.close(false);
  }


  /**
   * Precargo el formulario con los datos que llegan cuando selecciono la opción de editar
   */

  public setDataEdit(): void {
    if (this.dataInformation && this.dataInformation.option) {
      this.registerForm.setValue(this.dataInformation?.item);
      this.base64String = this.dataInformation?.item.photo;
    }
  }

  /**
   * Inicializo los campos del formulario y asigno validaciones a cada uno
   */

  init(): void {
    this.registerForm = this.formBuilder.group({
      id: [''],
      age: ['', [Validators.required, Validators.minLength(2), this.numericValidator]],
      name: ['', [Validators.required]],
      number: ['', [Validators.required, this.numericValidator]],
      photo: ['', ],
      position: ['', [Validators.required]],
    });
  }

  /**
   * Función para validar si el campo es numérico
   * @param control
   */
  numericValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && isNaN(control.value)) {
      return { 'notANumber': true };
    }
    return null;
  }

  /**
   * Generar ID con la hora minuto y segundo actual
   */
  public getIDPlayer(): any {

    let getDay = new Date().getDay().toString();
    const constGetMonth = new Date().getMonth() + 1;
    let getHours = new Date().getHours().toString();
    let getMinutes = new Date().getMinutes().toString();
    const getFullYear =new Date().getFullYear().toString();
    const getSegundos =new Date().getMilliseconds();
    let getMonth = constGetMonth.toString()
    const dataFinish = `${getFullYear}${getDay}${getMonth}${getHours}${getMinutes}${getSegundos}`;
    this.codePlayer = JSON.parse(dataFinish);

    return  this.codePlayer;

  }

}

