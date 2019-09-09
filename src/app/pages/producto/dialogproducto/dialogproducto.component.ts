import { PresentacionService } from './../../../_service/presentacion.service';
import { CategoriaproductoService } from './../../../_service/categoriaproducto.service';
import { ProveedorService } from 'src/app/_service/proveedor.service';
import { ProductoService } from './../../../_service/producto.service';
import { Presentacionproducto } from './../../../_model/presentacion';
import { Categoriaproducto } from './../../../_model/categoriaproducto';
import { Producto } from './../../../_model/producto';
import { Component, OnInit, Inject } from '@angular/core';
import { Proveedor } from 'src/app/_model/proveedor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogproducto',
  templateUrl: './dialogproducto.component.html',
  styleUrls: ['./dialogproducto.component.css']
})
export class DialogproductoComponent implements OnInit {

  producto: Producto;
  proveedores: Proveedor[] = []; 
  categorias: Categoriaproducto[] = [];
  presentaciones: Presentacionproducto[]=[];  
  idProveedorSeleccionado: number;
  idCategoriaSeleccionado: number;
  idPresentacionSeleccionado: number;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  
   constructor(public dialogRef: MatDialogRef<DialogproductoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Producto,
              private productoService:ProductoService,
              private proveedorService:ProveedorService,
              private categoriaproductoService:CategoriaproductoService,
              private presentacionService:PresentacionService) { }

   ngOnInit() {
      this.listarProveedores();
      this.listarCategorias();
      this.listarPresentaciones();
      this.producto = new Producto();
      this.producto.idproducto=this.data.idproducto;
      this.producto.nombreproducto = this.data.nombreproducto;
      this.producto.fvproducto = this.data.fvproducto;
      this.producto.cantidadproducto = this.data.cantidadproducto;
      this.producto.pventaproducto = this.data.pventaproducto;
      this.producto.pingresoproducto = this.data.pingresoproducto;
      this.producto.fingresoproducto = this.data.fingresoproducto;
      this.producto.marcaproducto = this.data.marcaproducto;
      this.producto.loteproducto = this.data.loteproducto;
      this.producto.proveedor = this.data.proveedor;
      this.producto.categoriaproducto = this.data.categoriaproducto;
      this.producto.presentacionproducto=this.data.presentacionproducto;
      if(this.data.idproducto!= null){
        this.idProveedorSeleccionado=this.data.proveedor.idproveedor;
        this.idCategoriaSeleccionado=this.data.categoriaproducto.idcategoriaproducto;
        this.idPresentacionSeleccionado=this.data.presentacionproducto.idpresentacionproducto;
      }
    }


    listarProveedores() {
      this.proveedorService.listarProveedor().subscribe(data => {
        this.proveedores = data;
      });
    }
    listarCategorias() {
      this.categoriaproductoService.listarCategoriaProducto().subscribe(data => {
        this.categorias = data;
      });
    }

    listarPresentaciones() {
      this.presentacionService.listarPresentacion().subscribe(data => {
        this.presentaciones = data;
      });
    }
  
    operar(){
      
      if(this.producto != null && this.producto.idproducto > 0){

        let proveedor = new Proveedor();
        proveedor.idproveedor= this.idProveedorSeleccionado;
        let categoria = new Categoriaproducto();
        categoria.idcategoriaproducto= this.idCategoriaSeleccionado;
        let presentacion = new Presentacionproducto();
        presentacion.idpresentacionproducto=this.idPresentacionSeleccionado;

        this.producto.proveedor=proveedor;
        this.producto.categoriaproducto=categoria;
        this.producto.presentacionproducto=presentacion;

        this.productoService.modificarproducto(this.producto).subscribe(data => {
          
            this.productoService.listarproductos().subscribe(productos => {
              this.productoService.productosCambio.next(productos);
              this.productoService.mensaje.next("Se modificó correctamente");
            });
          
        });
      }else{

        let proveedor = new Proveedor();
        proveedor.idproveedor= this.idProveedorSeleccionado;
        let categoria = new Categoriaproducto();
        categoria.idcategoriaproducto= this.idCategoriaSeleccionado;
        let presentacion = new Presentacionproducto();
        presentacion.idpresentacionproducto=this.idPresentacionSeleccionado;
        this.producto.proveedor=proveedor;
        this.producto.categoriaproducto=categoria;
        this.producto.presentacionproducto=presentacion;


        this.productoService.registrarproducto(this.producto).subscribe(data => {
          
            this.productoService.listarproductos().subscribe(productos => {
              this.productoService.productosCambio.next(productos);
              this.productoService.mensaje.next("Se registró correctamente");
            });
          
        });
      }
      this.dialogRef.close();
    }
  
    cancelar(){
      this.dialogRef.close();
      this.productoService.mensaje.next('se canceló el procedimiento');
    }
    

}
