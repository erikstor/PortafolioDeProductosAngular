import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductoInterface} from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productoFiltrado: ProductoInterface[] = [];

  constructor( private _http: HttpClient  ) {
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise ((resolve, reject) => {
      this._http.get('https://erik-stor-page.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoInterface[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
      });
    })
  }

  getProducto(id:string){
    return this._http.get(`https://erik-stor-page.firebaseio.com/productos/${ id }.json`);
  }


  buscarProducto(termino: string){
      if(this.productos.length === 0){
        this.cargarProductos().then( () =>{
            this.filtrarProductos(termino);
        });
      }else{
        this.filtrarProductos(termino);
      }

           
  }

  private filtrarProductos(termino){
    this.productoFiltrado = [];
    
    termino = termino.toLocaleUpperCase();

    this.productos.forEach((prod)=>{
      const tituloProducto = prod.titulo.toLocaleUpperCase();
      const categoriaProducto = prod.categoria.toLocaleUpperCase();

      if(categoriaProducto.indexOf(termino) >= 0 || tituloProducto.indexOf(termino) >= 0){
          this.productoFiltrado.push(prod);
      }

    })

  }

}
