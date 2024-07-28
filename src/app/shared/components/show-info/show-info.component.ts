import {Component, inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ApiService} from "../../../core/services/api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, JsonPipe} from "@angular/common";
import {LoadingComponent} from "../loading/loading.component";
import {ModalInfoComponent} from "../../modals/modal-info/modal-info.component";
import {ModalFormComponent} from "../../modals/modal-form/modal-form.component";
import {CrudService} from "../../../core/services/crud/crud.service";

@Component({
  selector: 'app-show-info',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    FormsModule,
    MatMenuModule,
    MatIcon,
    MatIconButton,
    DatePipe,
    LoadingComponent,
    JsonPipe,
  ],
  templateUrl: './show-info.component.html',
  styleUrl: './show-info.component.scss'
})
export class ShowInfoComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() optionTeam: any;

  public dataSource: any;
  public totalRegister: number = 0;
  public selectIndexTable: number | undefined;
  public inputForm: string;
  public loading: boolean;
  public tableConventionsColumns: string[];
  public dataTeam: any;

  api: ApiService = inject(ApiService);
  crud: CrudService = inject(CrudService);
  dialog: MatDialog = inject(MatDialog);

  constructor() {
    this.inputForm = '';
    this.tableConventionsColumns = [];
    this.loading = false;
    this.dataTeam = '';

  }

  ngOnInit(): void {
    this.getPlayerStorage();
    this._customerTableColumns();
  }

  /**
   * Cada vez que haya un cambio está este metodo escuchando
   */
  ngOnChanges(): void {
    this.getDataRegister();
  }

  /**
   * Consumo del servicio de listado de jugadores por cada equipo
   */
  getDataRegister(): void {

    this.loading = true;
    this.api?.readData(this.optionTeam)?.then((res: any) => {

      const dataResponse = res.response[0]?.players.sort((a: any, b: any) => b.id - a.id);
      this.dataTeam = res.response[0]?.team;

      this.crud?.removeStorage();

      this.setDataStorage(JSON.stringify(dataResponse))
      this.getPlayerStorage();
      this.crud.showPlayerRegister();

    }).catch(() => {

      this.loading = false

    }).finally(() => {
      setTimeout(() => {
        this.loading = false
      }, 2000)
    })
  }

  /**
   * Listar la información del equipo desde el storage
   */
  getPlayerStorage(): void {
    this.crud?.currentMessage?.subscribe((response: any) => {
      if (response && response.length > 0) {
        const DataDesc = response.sort((a: any, b: any) => b.id - a.id);
        this.dataSource = new MatTableDataSource<any>(DataDesc);
        this.dataSource.paginator = this.paginator;
        this.totalRegister = response?.length;
      }
    });
  }

  /**
   * Abrir el modal de confirmacion para la eliminacion del registro
   * @param element
   * @param index
   */
  openModalDelete(element: any, index: number): void {
    const dialog: any = this.dialog.open(ModalInfoComponent, {
      width: '400px',
      height: 'auto',
      data: {
        title: `Esta seguro de eliminar el registro de : ${element?.name}?`,
        buttons: {
          cancel: 'Cancelar',
          confirm: 'Confirmar'
        },
        item: 'data'
      }
    });

    dialog.afterClosed().subscribe({
      next: (response: any): void => {
        if (response) {
          this.crud.deletePlayer(element, index);
        }
      }
    });
  }

  /**
   * Buscar jugador por el nombre
   */
  searchRegister(): void {

    let dataFilter = this.dataSource.filteredData

    if (this.inputForm) {
      dataFilter = dataFilter.filter((res: any) => {
        return res.name.toLowerCase().includes(this.inputForm?.toLowerCase())
      });

      this.dataSource = new MatTableDataSource<any>(dataFilter);
    } else {
      this.getDataRegister();
    }
  }

  /**
   * Abrir el modal de creación y edición para un jugador
   * @param element
   * @param option
   * @param index
   */
  createNewPlayer(element: any, option: boolean, index?: number): void {
    this.dialog.open(ModalFormComponent, {
      width: '800px',
      height: 'auto',
      data: {
        title: option ? `Actualizar Jugador` : `Registrar nuevo Jugador`,
        option: option,
        index: index,
        buttons: {
          cancel: 'Cancelar',
          confirm: 'Guardar'
        },
        item: element
      }
    });
  }

  /**
   * Guardar la información de los jugadores cuando recargo la pagína
   * @param data
   * @private
   */
  private setDataStorage(data: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('player', data);
    }
  }

  /**
   * Inicializar los identificadores de cada columna en la tabla
   * @private
   */
  private _customerTableColumns(): void {
    this.tableConventionsColumns = [
      'photo',
      'name',
      'age',
      'number',
      'position',
      'action',
    ];
  }
}
