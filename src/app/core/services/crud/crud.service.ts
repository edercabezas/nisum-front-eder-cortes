import {Injectable} from '@angular/core';
import {AlertService} from "../alert/alert.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  carritoAnterior: Array<any>;
  addProductoCarrito: Array<any>;
  cartProductCount: any;
  private resulCard = new BehaviorSubject(null);
  currentMessage = this.resulCard.asObservable();

  constructor(private alertS: AlertService) {

    this.showProductCart();
    this.carritoAnterior = [];
    this.addProductoCarrito = [];
    this.cartProductCount = {};
    this.calculateProduct();
  }


  public addPlayer(data: any): void {
    let dataCart: any;
    dataCart = localStorage.getItem('player');

    console.log(data)
    let dataParse = JSON.parse(dataCart);
    dataParse = dataParse.sort((a: any, b: any) => b.id - a.id)

    this.carritoAnterior =  dataParse
    this.addProductoCarrito.push(data);

    if (this.addProductoCarrito) {

      if (!this.carritoAnterior) {
        this.carritoAnterior = [];
      }


      this.carritoAnterior.push(data);
      localStorage.setItem('player', JSON.stringify(this.carritoAnterior));


      const dataParse: any = localStorage.getItem('player');

      let itemParse =  JSON.parse(dataParse)

      itemParse = itemParse.sort((a: any, b: any) => b.id - a.id)

      localStorage.setItem('player', JSON.stringify(itemParse));

      this.alertS.showToasterFull('Producto agregado al carrito exitosamente');
    } else {
      this.alertS.showToasterError('Acabas de agregar este producto al carrito');
    }

    this.addProductoCarrito = [];
    this.showProductCart();

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

    this.showProductCart();
  }

  public showProductCart(): void {
    let data: any;

    if (typeof window !== 'undefined') {
      data = localStorage.getItem('player');
      this.resulCard.next(JSON.parse(data));
    }
  }


  public deletePlayer(data: any, index: number): void {
    let carrito: any;
    let dataCarrito: any;

    carrito = localStorage.getItem('player');
    if (carrito) {
      dataCarrito = JSON.parse(carrito);
    }

    dataCarrito.splice(index, 1);

    localStorage.setItem('player', JSON.stringify(dataCarrito));

    this.alertS.showToasterFull('Registro Eliminado exitosamente');
    this.showProductCart();
  }

  public removeStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('player');
    }
    this.showProductCart();

  }


  calculateProduct(): any {
    this.currentMessage.subscribe((response: any) => {
      this.cartProductCount = {};
      if (!response) {
        return;
      }

      response.forEach((res: any, index: number) => {
        this.cartProductCount[res.id] = {cantidad: res.cantidad, index};

      });
    });

  }

}
