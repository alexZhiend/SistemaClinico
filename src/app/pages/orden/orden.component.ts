import { OrdenFarmacia } from './../../_model/orden';
import { map } from 'rxjs/operators';

import { Detalleofvista } from './../../_model/detalleofvista';
import { DetalleExamen } from 'src/app/_model/detalleeg';
import { Producto } from './../../_model/producto';
import { OrdenfarmaciaService } from './../../_service/ordenfarmacia.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { DetalleOF } from './../../_model/detalleof';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { Component, OnInit } from '@angular/core';

import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  displayedColumns: string[] = ['cantidaddetalle', 'denominacionproducto','pventaproducto','importedetalle', 'acciones'];
  productos: Producto[] = [];
  productoseleccionado: Producto;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  ordenFarmacia:OrdenFarmacia;

  form:FormGroup;
  form1:FormGroup;

  detalle:DetalleOF;
  detalles:DetalleOF[]=[];

  transaction:Detalleofvista;
  precioventa:number;
  
  transactions:Detalleofvista[]=[];
  dataSource: MatTableDataSource<Detalleofvista>;
  numeroorden:number;
  ultimaorden:OrdenFarmacia;

  constructor(private ordenfarmaciaService:OrdenfarmaciaService,
    private productoService:ProductoService,
    public snackBar:MatSnackBar) {
      this.detalle = new DetalleOF();
      this.transaction=new Detalleofvista();
      this.ordenFarmacia=new OrdenFarmacia();
      this.ordenFarmacia.detalleordenF=new DetalleOF();
      this.form= new FormGroup({
        'numeroorden': new FormControl({value:0 , disabled:true}, Validators.required),
        'rucordenfarmacia': new FormControl(0),
        'fechaseleccionada': new FormControl(null),
        'consumidorordenfarmacia': new FormControl('')
      });
      this.form1=new FormGroup({
        'productoSeleccionado': new FormControl(null),
        'cantidadfarmacia':new FormControl(0),
      });
     }

  ngOnInit() {
    this.listarproducto();
    this.companterior();
    this.numeroorden=123;

    this.ordenfarmaciaService.mensaje.subscribe(data=>{
      this.snackBar.open(data, null, { duration: 3000 });
      });

  }

  listarproducto(){
    this.productoService.listarproductos().subscribe(data => {
      this.productos=data;
    })
  }

  companterior(){
    this.ordenfarmaciaService.listarOrdenFarmaciaId().subscribe(data=>{
      this.ultimaorden=data;
      // console.log(this.ultimaorden);
      // let numero = this.ultimaorden.numeroorden.toString();
      // let cero = "0";
      // for(var _i=numero.length;;){
 
      // }
    });
  }


  agregar(){

    if (this.form1.valid === true) {
      this.productoseleccionado=this.form1.value['productoSeleccionado'];
      this.transaction.cantidad=this.form1.value['cantidadfarmacia'];
      this.transaction.producto=this.productoseleccionado.nombreproducto;
      this.transaction.precio=this.productoseleccionado.pventaproducto;
      this.transaction.importe=this.form1.value['cantidadfarmacia']*this.transaction.precio;

        let model2={
          "iddetalleordenf": null,
          "cantidad":this.transaction.cantidad,
          "producto":this.productoseleccionado,
        }

        this.detalles.push(model2);
        this.ordenFarmacia.detalleordenF=this.detalles;
        console.log(this.ordenFarmacia.detalleordenF);

      let model = {
        "cantidad":this.transaction.cantidad,
        "producto":this.transaction.producto,
        "precio":this.transaction.precio,
        "importe":this.transaction.importe,
      }
      this.transactions.push(model);
      console.log(this.transactions);
      this.dataSource = new MatTableDataSource(this.transactions);
      this.form1.reset();
    }
    else{
      this.ordenfarmaciaService.mensaje.next('Falta algún dato requerido');
    }
  }

  getTotalCost() {
    return this.transactions.map(t => t.importe).reduce((acc, value) => acc + value, 0);
  }

  operar(){
    this.ordenFarmacia.consumidorordenfarmacia=this.form.value['consumidorordenfarmacia'];
    this.ordenFarmacia.numeroorden=this.form.value['numeroorden'];
    this.ordenFarmacia.fechaordenfarmacia=this.fechaSeleccionada;
    this.ordenFarmacia.rucordenfarmacia=this.form.value['rucordenfarmacia'];
    if (this.form.valid ===true) {
      console.log(this.ordenFarmacia);
      this.ordenfarmaciaService.registrarOrdenFarmacia(this.ordenFarmacia).subscribe(data =>{
        this.ordenfarmaciaService.mensaje.next('Se registró correctamente');
      });
    }else{
      this.ordenfarmaciaService.mensaje.next('Falta algún dato requerido');
    }
  }

  cancelar(){
    window.location.reload();
  }

}
