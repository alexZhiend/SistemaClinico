import { DialogproductoComponent } from './dialogproducto/dialogproducto.component';
import { ProductoService } from './../../_service/producto.service';
import { Producto } from './../../_model/producto';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  displayedColumns = ['idproducto', 'nombreproducto', 'fvproducto', 'cantidadproducto','pventaproducto', 'pingresoproducto', 'marcaproducto', 'loteproducto', 'fingresoproducto','proveedor','categoriaproducto','presentacionproducto','presentacionproductounidad','presentacionproductocant', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  mensaje: string;
  pro:any='';
  vent:any='';

  fechaSeleccionada1: Date = null;
  maxFecha1: Date = new Date();

  fechaSeleccionada2: Date = null;
  maxFecha2: Date = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productoService:ProductoService,
              public dialog:MatDialog, 
              public snackBar:MatSnackBar) { }

ngOnInit() {
    this.productoService.productosCambio.subscribe(data => {
      this.productos = data;
      this.dataSource = new MatTableDataSource(this.productos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 2000 });
    });

    this.productoService.listarproductos().subscribe(data => {
      this.productos = data;

      this.dataSource = new MatTableDataSource(this.productos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  openDialog(producto: Producto): void {

    let pro = producto != null ? producto : new Producto();
    let dialogRef = this.dialog.open(DialogproductoComponent, {
      width: '500px',   
      disableClose: true,   
      
      data: pro      
    });
  }
  
  generatepdf(){
    this.productoService.reporteProductoGeneral().subscribe(data=>{
      this.pro=data;
    })
  }

  pdfventas() {
    if (this.fechaSeleccionada1!=null && this.fechaSeleccionada2!=null 
      && this.fechaSeleccionada1<this.fechaSeleccionada2) {
        let s1 = moment(this.fechaSeleccionada1).format("DD-MM-YYYY");
        let s2 = moment(this.fechaSeleccionada2).format("DD-MM-YYYY");
        this.productoService.reporteProductoVentas(s1,s2).subscribe(data=>{
          this.vent=data;
        })
    }else{
      this.productoService.mensaje.next('La fecha de inicio debe ser mayor a la fecha de fin');
    }
    
  }

}