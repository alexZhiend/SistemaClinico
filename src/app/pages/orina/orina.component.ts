import { DialogOrinaComponent } from './dialog-orina/dialog-orina.component';
import { OrinaService } from './../../_service/orina.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Orina } from 'src/app/_model/orina';

@Component({
  selector: 'app-orina',
  templateUrl: './orina.component.html',
  styleUrls: ['./orina.component.css']
})
export class OrinaComponent implements OnInit {
  orinas: Orina[] = [];
  displayedColumns = ['idanalisisorina','fecha','nombrespaciente','hcl','observaciones','acciones'];
  dataSource: MatTableDataSource<Orina>;
  mensaje: string;
  orin:string="";
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orinaService:OrinaService,    
    public dialog:MatDialog, 
    public snackBar:MatSnackBar) { }


ngOnInit() {
      this.orinaService.orinaCambio.subscribe(data => {
        this.orinas = data;
        this.dataSource = new MatTableDataSource(this.orinas);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  
      this.orinaService.mensaje.subscribe(data => {
        console.log(data);
        this.snackBar.open(data, null, { duration: 2000 });
      });
  
      this.orinaService.listarOrina().subscribe(data => {
        this.orinas = data;
        this.dataSource = new MatTableDataSource(this.orinas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }); 
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
    openDialog(orina: Orina): void {
      let pro = new Orina();
      let dialogRef = this.dialog.open(DialogOrinaComponent, {
        width: '520px',   
        disableClose: true,   
        data: pro      
      });
    }
    
    generatepdf(o: Orina){
      console.log(o.idanalisisorina);
      this.orinaService.reporteOrinaPaciente(o.idanalisisorina).subscribe(data => {
        
  
        let reader = new FileReader();
        reader.onload = (e:any)=>{
          console.log(e.target.result);
          this.orin = e.target.result; //base64
        }
        reader.readAsArrayBuffer(data);
      });
    }
    
}
