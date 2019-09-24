import { ExamenesgService } from './../../_service/examenesg.service';
import { Examenesg } from './../../_model/examenesg';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-examenesgenerales',
  templateUrl: './examenesgenerales.component.html',
  styleUrls: ['./examenesgenerales.component.css']
})
export class ExamenesgeneralesComponent implements OnInit {

  lista: Examenesg[]=[];
  displayedColumns=['idexamenesg','denominacion','descripcion','acciones'];
  dataSource: MatTableDataSource<Examenesg>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private examenesgService:ExamenesgService,
    private matSnackBar:MatSnackBar) { }

  ngOnInit() {
    this.examenesgService.examenesgCambio.subscribe(data => {
      this.lista=data;
      this.dataSource= new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;

      this.examenesgService.mensaje.subscribe(data =>{
        this.matSnackBar.open(data, 'Aviso',{duration:3000});
      });
    });


    this.examenesgService.listarExamenesg().subscribe(data => {
      this.lista=data;
      console.log(data);
      this.dataSource=new MatTableDataSource(this.lista);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }
}
