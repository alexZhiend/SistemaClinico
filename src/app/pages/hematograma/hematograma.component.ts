import { HematogramaC } from './../../_model/hematogramaC';
import { ComprobantepagoService } from './../../_service/comprobantepago.service';
import { ComprobantePago } from './../../_model/comprobantepago';
import { FormGroup, FormControl } from '@angular/forms';
import { DialogHematogramaComponent } from './dialog-hematograma/dialog-hematograma.component';
import { HematogramaService } from './../../_service/hematograma.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Hematograma } from './../../_model/hematograma';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hematograma',
  templateUrl: './hematograma.component.html',
  styleUrls: ['./hematograma.component.css']
})
export class HematogramaComponent implements OnInit {
  hematogramas: Hematograma[] = [];
  displayedColumns = ['idhematograma','fecha','tipo','observaciones','nombrespaciente','apellidospaciente','hcl','acciones'];
  dataSource: MatTableDataSource<Hematograma>;
  mensaje: string;
  
  comprobantepagos: ComprobantePago[] = []; 
  idcomprobantepagoSeleccionado: number;
  hematograma: Hematograma;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(private hematogramaService:HematogramaService,    
    public dialog:MatDialog, 
    public snackBar:MatSnackBar,
    private comprobantepagoService:ComprobantepagoService) {
      this.hematograma=new Hematograma();
      this.form= new FormGroup({
        'idhematograma': new FormControl(null),
        'observaciones': new FormControl(''),
        'fechaseleccionada': new FormControl(null),
        'idcomprobantepagoSeleccionado': new FormControl(null),
        'hematies': new FormControl(null),
        'leucocitos': new FormControl(null),
        'plaquetas': new FormControl(null),
        'hemoglobina': new FormControl(null),
        'hematocrito': new FormControl(null),
        'tcoagulacion': new FormControl(null),
        'tsangria': new FormControl(null),
        'vsg': new FormControl(null),
        'gruposanguineo': new FormControl(null),
        'rh': new FormControl(null),
        'tipo' : new FormControl(null)
      });
     }


ngOnInit() {
      this.hematogramaService.hematogramaCambio.subscribe(data => {
        this.hematogramas = data;
        this.dataSource = new MatTableDataSource(this.hematogramas);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  
      this.hematogramaService.mensaje.subscribe(data => {
        console.log(data);
        this.snackBar.open(data, null, { duration: 2000 });
      });
  
      this.hematogramaService.listarHematograma().subscribe(data => {
        this.hematogramas = data;
        this.dataSource = new MatTableDataSource(this.hematogramas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }); 

      this.listarComprobante();
    }

    listarComprobante(){
      this.comprobantepagoService.listarComprobantePago().subscribe(data => { 
        this.comprobantepagos=data;
      })
    }
  
  
    operar(){
      let comprobante = new ComprobantePago();
      comprobante.idcomprobantepago=this.form.value['idcomprobantepagoSeleccionado'];
      console.log(comprobante);
      this.hematograma.comprobantepago=comprobante;
      this.hematograma.hematies=this.form.value['hematies'];
      this.hematograma.leucocitos=this.form.value['leucocitos'];
      this.hematograma.plaquetas=this.form.value['plaquetas'];
      this.hematograma.hemoglobina=this.form.value['hemoglobina'];
      this.hematograma.hematocrito=this.form.value['hematocrito'];
      this.hematograma.tcoagulacion=this.form.value['tcoagulacion'];
      this.hematograma.tsangria=this.form.value['tsangria'];
      this.hematograma.gruposanguineo=this.form.value['gruposanguineo'];
      this.hematograma.rh=this.form.value['rh'];
      this.hematograma.vsg=this.form.value['vsg'];
      this.hematograma.tipo=this.form.value['tipo'];
      this.hematograma.observaciones=this.form.value['observaciones'];   
      this.hematograma.fecha=this.fechaSeleccionada;
      let hematogramac = new HematogramaC();
      hematogramac.idhematogramacompleto=parseInt(localStorage.getItem('idrecuperado'));
      this.hematograma.hematogramacompleto=hematogramac;

      console.log(this.hematograma.hematogramacompleto.idhematogramacompleto);
      if (this.form.valid === true) {
        this.hematogramaService.registrarHematograma(this.hematograma).subscribe(data =>{
          this.hematogramaService.listarHematograma().subscribe(orina=>{
            this.hematogramaService.hematogramaCambio.next(orina);
            this.hematogramaService.mensaje.next("Se registró correctamente")
          });
          this.form.reset();
        });
      }else{
        this.hematogramaService.mensaje.next("falta algun dato requerido")
      }   
  }

  cancelar(){
    this.form.reset();
    this.hematogramaService.mensaje.next("Se cancelo el procedimiento")
  }






    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
    openDialog(hematograma: Hematograma): void {
      let pro = new Hematograma();
      let dialogRef = this.dialog.open(DialogHematogramaComponent, {
        width: '520px',   
        disableClose: true,   
        data: pro      
      });
    }
    
    
    generatepdf(){
    }
    
}
