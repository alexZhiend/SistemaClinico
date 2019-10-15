import { OrdenFarmacia } from './../../_model/orden';
import { map, startWith } from 'rxjs/operators';

import { Detalleofvista } from './../../_model/detalleofvista';
import { DetalleExamen } from 'src/app/_model/detalleeg';
import { Producto } from './../../_model/producto';
import { OrdenfarmaciaService } from './../../_service/ordenfarmacia.service';
import { MatSnackBar, MatTableDataSource, MatSelectChange, MatOption, MatAutocompleteSelectedEvent } from '@angular/material';
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

  producto=new FormControl();
  filteredOptions: Observable<Producto[]>;



  form:FormGroup;
  form1:FormGroup;

  detalle:DetalleOF;
  detalles:DetalleOF[]=[];

  transaction:Detalleofvista;
  precioventa:number;

  transactions:Detalleofvista[]=[];
  dataSource: MatTableDataSource<Detalleofvista>;

  ultimaorden:OrdenFarmacia;
  numeroorden:string;
  productostock:Producto;
  stock:number;
  nombres:number[];
  a:Producto;
  cantidades:number[];
  stockreal:number;
  idproductoseleccionado: number;
  or:any='';

  constructor(private ordenfarmaciaService:OrdenfarmaciaService,
    private productoService:ProductoService,
    public snackBar:MatSnackBar) {
      this.cantidades=[];
      this.nombres=[];
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
        'cantidadfarmacia':new FormControl(0),
        'stock': new FormControl({value:0 , disabled:true}, Validators.required),
      });
      this.productoseleccionado= new Producto();
     }

  ngOnInit() {
    this.listarproducto();
    this.companterior();

    this.ordenfarmaciaService.mensaje.subscribe(data=>{
      this.snackBar.open(data, null, { duration: 4000 });
      });

      this.filteredOptions = this.producto.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombreproducto),
        map(nombreproducto => nombreproducto ? this._filter(nombreproducto) : this.productos.slice())
      );
  }

  listarproducto(){
    this.productoService.listarproductos().subscribe(data => {
      this.productos=data;
    })
  }

  displayFn(producto?: Producto): string | undefined {
    return producto ? producto.nombreproducto : undefined;
  }

  private _filter(nombreproducto: string): Producto[] {
    const filterValue = nombreproducto.toLowerCase();
    return this.productos.filter(producto => producto.nombreproducto.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.productoseleccionado=event.option.value;
    this.idproductoseleccionado=this.productoseleccionado.idproducto;
    this.productostock=this.productoseleccionado;
    this.stock=this.productostock.cantidadproducto;
    console.log(this.productoseleccionado);
  }

  // prueba(event: MatSelectChange) {
  //   const selectedData = {
  //     text: (event.source.selected as MatOption).viewValue,
  //     value: event.source.value
  //   }
  //   this.productostock = selectedData.value;
  //   this.stock=this.productostock.cantidadproducto;
  // }

  companterior(){
    this.ordenfarmaciaService.listarOrdenFarmaciaId().subscribe(data=>{
      this.ultimaorden=data;
      console.log(this.ultimaorden);
      if(this.ultimaorden!=null){
      var numero= this.ultimaorden.numeroorden + 1;
      }else{
        numero=1;
      }

      let numeronuevo=numero.toString();
      let cero = "0";
      for(var _i=0;_i < 7-numeronuevo.length; _i++){
        cero=cero+"0";
      }
      this.numeroorden=cero+numeronuevo;
      console.log(parseInt(this.numeroorden));
    });
  }

  agregar(){

    if (this.form1.valid === true) {

      this.productoseleccionado;
      this.transaction.cantidad=this.form1.value['cantidadfarmacia'];
      this.transaction.producto=this.productoseleccionado.nombreproducto;

      this.transaction.precio=this.productoseleccionado.pventaproducto;
      this.transaction.importe=this.form1.value['cantidadfarmacia']*this.transaction.precio;
      
      if(this.stock>this.transaction.cantidad){
        let model2={
          "iddetalleordenf": null,
          "cantidad":this.transaction.cantidad,
          "producto":this.productoseleccionado,
          "nombreproducto":this.productoseleccionado.nombreproducto,
        }

        this.detalles.push(model2);
        this.ordenFarmacia.detalleordenF=this.detalles;

      let model = {
        "cantidad":this.transaction.cantidad,
        "producto":this.transaction.producto,
        "precio":this.transaction.precio,
        "importe":this.transaction.importe,
      }

      this.nombres.push(this.productoseleccionado.idproducto);

      this.cantidades.push(this.transaction.cantidad);

      this.transactions.push(model);
      console.log(this.transactions);
      this.dataSource = new MatTableDataSource(this.transactions);
      this.form1.reset();
      this.producto.setValue("");
      }
      
      else{
        this.ordenfarmaciaService.mensaje.next('Revise el stock del producto, la cantidad ingresada del producto debe ser menor al stock');
      }

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
    this.ordenFarmacia.numeroorden=parseInt(this.numeroorden);
    this.ordenFarmacia.fechaordenfarmacia=this.fechaSeleccionada;
    this.ordenFarmacia.rucordenfarmacia=this.form.value['rucordenfarmacia'];
    if (this.form.valid ===true) {

      for (let i = 0; i < this.nombres.length; i++) {
        this.productoService.listarproductoporNombre(this.nombres[i]).subscribe(data=>{
          this.a = Object.assign(new Producto(),data);
          this.a.cantidadproducto=(this.a.cantidadproducto-this.cantidades[i]);
          this.productoService.modificarproducto(this.a).subscribe(dataa=>{});         
        });       
      }


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
  eliminar(transaction){
    var position= this.transactions.indexOf(transaction);
    this.ordenFarmacia.detalleordenF.splice(position,1);
    this.transactions.splice(position,1);
    this.nombres.splice(position,1);
    this.cantidades.splice(position,1);
    console.log(this.transactions);
    console.log(this.ordenFarmacia.detalleordenF);
    console.log(this.nombres);
    this.dataSource= new MatTableDataSource(this.transactions);
  }

  imprimir(){
    let a=parseInt(this.numeroorden);
    console.log(a);
    this.ordenfarmaciaService.reporteOrdenFPaciente(a).subscribe(data=>{
      this.or=data;
    })
  }

}
