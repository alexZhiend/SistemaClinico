import { DialogurocultivoComponent } from './dialogurocultivo/dialogurocultivo.component';
import { UrocultivoService } from './../../_service/urocultivo.service';
import { Urocultivo } from './../../_model/urocultivo';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-urocultivo',
  templateUrl: './urocultivo.component.html',
  styleUrls: ['./urocultivo.component.css']
})
export class UrocultivoComponent implements OnInit {
  urocultivos: Urocultivo[] = [];
  displayedColumns = ['idurocultivo','fecha','nombrespaciente','hcl','observaciones','acciones'];
  dataSource: MatTableDataSource<Urocultivo>;
  mensaje: string;
  uro:any='';
  row:Urocultivo;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private urocultivoService:UrocultivoService,    
    public dialog:MatDialog, 
    public snackBar:MatSnackBar) { }

 ngOnInit() {
      this.urocultivoService.urocultivoCambio.subscribe(data => {
        this.urocultivos = data;
        this.dataSource = new MatTableDataSource(this.urocultivos);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  
      this.urocultivoService.mensaje.subscribe(data => {
        console.log(data);
        this.snackBar.open(data, null, { duration: 2000 });
      });
  
      this.urocultivoService.listarUrocultivo().subscribe(data => {
        this.urocultivos = data;
        this.dataSource = new MatTableDataSource(this.urocultivos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }); 
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
    openDialog(urocultivo: Urocultivo): void {
      let pro = new Urocultivo();
      let dialogRef = this.dialog.open(DialogurocultivoComponent, {
        width: '700px',   
        disableClose: true,   
        data: pro      
      });
    }

    generatepdf(u: Urocultivo){

      if (u.antibiograma=="positivo") {
        this.urocultivoService.reporteUrocultivoP(u.idurocultivo).subscribe(data => {    

          this.uro=data;
        });
      }
      else{
        this.urocultivoService.reporteUrocultivoN(u.idurocultivo).subscribe(data => {    
          this.uro=data;
        });
      }

    }
    
}
