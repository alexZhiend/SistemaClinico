import { Params } from '@angular/router/src/shared';
import { ProveedorService } from './../../../_service/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Proveedor } from 'src/app/_model/proveedor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedor-edicion',
  templateUrl: './proveedor-edicion.component.html',
  styleUrls: ['./proveedor-edicion.component.css']
})
export class ProveedorEdicionComponent implements OnInit {
  id:number;
  proveedor:Proveedor;
  form: FormGroup;
  edicion:boolean=false;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private proveedorService:ProveedorService) {
      this.proveedor=new Proveedor;
      this.form=new FormGroup({
        'id': new FormControl(0),
        'nombre': new FormControl(''),
        'telefono':new FormControl(0),
        'direccion':new FormControl(''),
        'correo':new FormControl(''),
        'descripcion':new FormControl(''),
      });
}

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if(this.edicion){
      this.proveedorService.listarProveedorPorId(this.id).subscribe(data=>{
        let id = data.idproveedor;
        let nombre = data.nombreproveedor;
        let telefono = data.telefonoproveedor;
        let direccion=data.direccionproveedor;
        let correo=data.correoproveedor;
        let descripcion=data.desripcionproveedor; 

        this.form= new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'telefono':new FormControl(telefono),
          'direccion':new FormControl(direccion),
          'correo':new FormControl(correo),
          'descripcion':new FormControl(descripcion),
        });
      });
    }
  }

  operar(){
    this.proveedor.idproveedor=this.form.value['id'];
    this.proveedor.nombreproveedor=this.form.value['nombre'];
    this.proveedor.telefonoproveedor=this.form.value['telefono'];
    this.proveedor.direccionproveedor=this.form.value['direccion'];
    this.proveedor.correoproveedor=this.form.value['correo'];
    this.proveedor.desripcionproveedor=this.form.value['descripcion'];

    if(this.edicion){
      this.proveedorService.modificarProveedor(this.proveedor).subscribe(data=>{
        console.log(data);
        this.proveedorService.listarProveedor().subscribe(proveedores =>{
          this.proveedorService.proveedorCambio.next(proveedores);
          this.proveedorService.mensaje.next('Se modificó el proveedor correctamente');
        });
      });
    }
    else{
      this.proveedorService.registrarProveedor(this.proveedor).subscribe(data =>{
        console.log(data);
        this.proveedorService.listarProveedor().subscribe(proveedores => {
          this.proveedorService.proveedorCambio.next(proveedores);
          this.proveedorService.mensaje.next('Se registro el proveedor correctamente');
        });
      });
    }

    this.router.navigate(['proveedor']);
  }

}
