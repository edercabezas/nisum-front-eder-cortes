import {Injectable} from '@angular/core';
import {AlertService} from "../alert/alert.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  playerInit: Array<any>;
  addPlayerRegister: Array<any>;
  playerRegisterCount: any;
  private resultPlayer = new BehaviorSubject(null);
  currentMessage = this.resultPlayer.asObservable();

  constructor(private alertS: AlertService) {

    this.showPlayerRegister();
    this.playerInit = [];
    this.addPlayerRegister = [];
    this.playerRegisterCount = {};
    this.calculateProduct();
  }


  public addPlayer(data: any): void {
    let dataCart: any;
    dataCart = localStorage.getItem('player');

    console.log(data)
    let dataParse = JSON.parse(dataCart);
    dataParse = dataParse.sort((a: any, b: any) => b.id - a.id)

    this.playerInit =  dataParse
    this.addPlayerRegister.push(data);

    if (this.addPlayerRegister) {

      if (!this.playerInit) {
        this.playerInit = [];
      }


      this.playerInit.push(data);
      localStorage.setItem('player', JSON.stringify(this.playerInit));


      const dataParse: any = localStorage.getItem('player');

      let itemParse =  JSON.parse(dataParse)

      itemParse = itemParse.sort((a: any, b: any) => b.id - a.id)

      localStorage.setItem('player', JSON.stringify(itemParse));

      this.alertS.showToasterFull('Producto agregado al carrito exitosamente');
    } else {
      this.alertS.showToasterError('Acabas de agregar este producto al carrito');
    }

    this.addPlayerRegister = [];
    this.showPlayerRegister();

  }

  public updatePlayer(data: any, index: number): void {

    let items: any;

    const players = localStorage.getItem('player');

    if (players) {
      items = JSON.parse(players);
    }

    items[index].age = data?.age;
    items[index].name = data?.name;
    items[index].number = data?.number;
    items[index].photo = data?.photo;
    items[index].position = data?.position;

    localStorage.setItem('player', JSON.stringify(items));

    this.alertS.showToasterFull('Registro actualizado exitosamente');

    this.showPlayerRegister();
  }

  public showPlayerRegister(): void {
    let data: any;

    if (typeof window !== 'undefined') {
      data = localStorage.getItem('player');
      this.resultPlayer.next(JSON.parse(data));
    }
  }


  public deletePlayer(data: any, index: number): void {
    let player: any;
    let dataPlayer: any;

    player = localStorage.getItem('player');
    if (player) {
      dataPlayer = JSON.parse(player);
    }

    dataPlayer.splice(index, 1);

    localStorage.setItem('player', JSON.stringify(dataPlayer));

    this.alertS.showToasterFull('Registro Eliminado exitosamente');
    this.showPlayerRegister();
  }

  public removeStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('player');
    }
    this.showPlayerRegister();

  }


  calculateProduct(): any {
    this.currentMessage.subscribe((response: any) => {
      this.playerRegisterCount = {};
      if (!response) {
        return;
      }

      response.forEach((res: any, index: number) => {
        this.playerRegisterCount[res.id] = {cantidad: res.cantidad, index};

      });
    });

  }

}
