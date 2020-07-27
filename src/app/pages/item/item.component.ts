import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcionInterface } from '../../interfaces/productoDescripcion.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcionInterface 
  id: string

  constructor(private route: ActivatedRoute, public _productoService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
        
        this._productoService.getProducto(params.id)
        .subscribe((producto: ProductoDescripcionInterface)=>{
          this.producto = producto;
          this.id = params.id;          
        })

    })
  }

}
