import { TipopacienteService } from './../../../_service/tipopaciente.service';
import { PacienteService } from './../../../_service/paciente.service';
import { Tipopaciente } from './../../../_model/tipopaciente';
import { Component, OnInit, Inject } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogpaciente',
  templateUrl: './dialogpaciente.component.html',
  styleUrls: ['./dialogpaciente.component.css']
})
export class DialogpacienteComponent implements OnInit {
  paciente: Paciente;
  tipopacientes: Tipopaciente[] = []; 
  idTipopacienteSeleccionado: number;


  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  hclinterno: Paciente[]=[];
  hclexterno: Paciente[]=[];

  constructor(public dialogRef: MatDialogRef<DialogpacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente,
    private pacienteService:PacienteService,
    private tipopacienteService:TipopacienteService) { }

ngOnInit() {
    this.listarInterno();
    this.listarExterno();
      this.listarTipopaciente();
      this.paciente = new Paciente();
      this.paciente.hcl=this.data.hcl;
      this.paciente.nombresyapellidos = this.data.nombresyapellidos;
      this.paciente.dnipaciente = this.data.dnipaciente;
      this.paciente.fechanacimientopaciente = this.data.fechanacimientopaciente;
      this.paciente.departamentopaciente = this.data.departamentopaciente;
      this.paciente.provinciapaciente = this.data.provinciapaciente;
      this.paciente.distritopaciente = this.data.distritopaciente;
      this.paciente.direccionpaciente = this.data.direccionpaciente;
      this.paciente.telefonopaciente = this.data.telefonopaciente;
      this.paciente.ocupacionpaciente = this.data.ocupacionpaciente;
      this.paciente.estadocivilpaciente=this.data.estadocivilpaciente;
      this.paciente.niveleducacionpaciente=this.data.niveleducacionpaciente;
      this.paciente.datospadrepaciente=this.data.datospadrepaciente;
      this.paciente.datosmadrepaciente=this.data.datosmadrepaciente;
      this.paciente.tipopaciente=this.data.tipopaciente;

      if(this.data.hcl!= null){
        this.idTipopacienteSeleccionado=this.data.tipopaciente.idtipopaciente;
      }
    }


    listarTipopaciente() {
      this.tipopacienteService.listarTipoPaciente().subscribe(data => {
        this.tipopacientes = data;
      });
    }

    listarInterno(){
      this.pacienteService.listarInterno().subscribe(data =>{
        this.hclinterno=data;
      })
    }
  
    listarExterno(){
      this.pacienteService.listarExterno().subscribe(data =>{
        this.hclexterno=data;
      })
    }

    operar(){
      console.log(this.data.hcl);

      if(this.paciente != null && this.paciente.hcl.length > 0){
        let tipopaciente = new Tipopaciente();
        tipopaciente.idtipopaciente= this.idTipopacienteSeleccionado;
        this.paciente.tipopaciente=tipopaciente;

        this.pacienteService.modificarpaciente(this.paciente).subscribe(data => {
          
            this.pacienteService.listarpaciente().subscribe(pacientes => {
              this.pacienteService.pacienteCambio.next(pacientes);
              this.pacienteService.mensaje.next("Se modificó correctamente");
            });
          
        });

      }else{
        let tipopaciente = new Tipopaciente();
        tipopaciente.idtipopaciente= this.idTipopacienteSeleccionado;
        this.paciente.tipopaciente=tipopaciente;

        if (this.paciente.hcl !=null&&this.paciente.nombresyapellidos!=null&&this.paciente.departamentopaciente!=null&&this.paciente.direccionpaciente!=null
          &&this.paciente.distritopaciente!=null&&this.paciente.dnipaciente!=null&&this.paciente.estadocivilpaciente!=null&&this.paciente.fechanacimientopaciente!=null&&
          this.paciente.provinciapaciente!=null&&this.paciente.tipopaciente != null&&this.paciente.ocupacionpaciente!=null &&this.paciente.niveleducacionpaciente!=null &&this.paciente.tipopaciente!=null) {
            this.pacienteService.registrarpaciente(this.paciente).subscribe(data => {
              this.pacienteService.listarpaciente().subscribe(pacientes => {
                this.pacienteService.pacienteCambio.next(pacientes);
                this.pacienteService.mensaje.next("Se registró correctamente");
              });
            
          });
          this.dialogRef.close();
            
        }else{
          this.pacienteService.mensaje.next('Falta algún dato requerido del paciente')

        }
      }
      
    }
  
    cancelar(){
      this.dialogRef.close();
      this.pacienteService.mensaje.next('Se canceló el procedimiento');
    }
    

}
