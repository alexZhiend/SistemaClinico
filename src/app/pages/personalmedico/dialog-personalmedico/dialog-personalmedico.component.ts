import { PersonalmedicoService } from './../../../_service/personalmedico.service';
import { Tipopersonalmedico } from 'src/app/_model/tipopersonalmedico';
import { TipopersonalmedicoService } from './../../../_service/tipopersonalmedico.service';
import { Personalmedico } from './../../../_model/personalmedico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';

@Component({
  selector: 'app-dialog-personalmedico',
  templateUrl: './dialog-personalmedico.component.html',
  styleUrls: ['./dialog-personalmedico.component.css']
})
export class DialogPersonalmedicoComponent implements OnInit {
  
  personalmedico: Personalmedico;
  tipopersonalmedicos: Tipopersonalmedico[] = [];
  especialidades:Especialidad[]=[]; 
  idTipopersonalmedicoSeleccionado: number;
  idEspecialidadSeleccionado:number;


  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  constructor(public dialogRef: MatDialogRef<DialogPersonalmedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personalmedico,
    private tipopersonalmedicoService:TipopersonalmedicoService,
    private especialidadService:EspecialidadService, private personalmedicoService:PersonalmedicoService) { }


  ngOnInit() {
      this.listarTipopersonalmedico();
      this.listarEspecialdiad();
      this.personalmedico = new Personalmedico();
      this.personalmedico.dnipersonalmedico=this.data.dnipersonalmedico;
      this.personalmedico.nombrespersonalmedico = this.data.nombrespersonalmedico;
      this.personalmedico.apellidospersonalmedico = this.data.apellidospersonalmedico;
      this.personalmedico.correopersonalmedico = this.data.correopersonalmedico;
      this.personalmedico.fechanacimientopersonalmedico = this.data.fechanacimientopersonalmedico;
      this.personalmedico.telefonopersonalmedico = this.data.telefonopersonalmedico;
      this.personalmedico.rnepersonalmedico = this.data.rnepersonalmedico;
      this.personalmedico.cmppersonalmedico = this.data.cmppersonalmedico;
      this.personalmedico.estadocivilpersonalmedico = this.data.estadocivilpersonalmedico;
      this.personalmedico.areapersonalmedico = this.data.telefonopersonalmedico;
      this.personalmedico.tipopersonalmedico = this.data.tipopersonalmedico;
      this.personalmedico.especialidad=this.data.especialidad;


      if(this.data.dnipersonalmedico != null){
        this.idTipopersonalmedicoSeleccionado=this.data.tipopersonalmedico.idtipopersonalmedico;
        this.idEspecialidadSeleccionado=this.data.especialidad.idespecialidad;
      }
    }

    listarTipopersonalmedico() {
      this.tipopersonalmedicoService.listarTipopersonal().subscribe(data => {
        this.tipopersonalmedicos = data;
      });
    }

    listarEspecialdiad() {
      this.especialidadService.listarEspecialidad().subscribe(data => {
        this.especialidades = data;
      });
    }
  
    operar(){
      
      if(this.personalmedico == null && this.personalmedico.dnipersonalmedico == null){

        let tipopersonalmedico = new Tipopersonalmedico();
        tipopersonalmedico.idtipopersonalmedico= this.idTipopersonalmedicoSeleccionado;
        let especialidad = new Especialidad();
        especialidad.idespecialidad= this.idEspecialidadSeleccionado;

        this.personalmedico.tipopersonalmedico=tipopersonalmedico;
        this.personalmedico.especialidad=especialidad;

        this.personalmedicoService.modificarPersonalMedico(this.personalmedico).subscribe(data => {
          
            this.personalmedicoService.listarPersonalMedico().subscribe(personalmedicos => {
              this.personalmedicoService.personalCambio.next(personalmedicos);
              this.personalmedicoService.mensaje.next("Se modificaron correctamente los datos del personal médico");
            });
          
        });
      }else{

        let tipopersonalmedico = new Tipopersonalmedico();
        tipopersonalmedico.idtipopersonalmedico= this.idTipopersonalmedicoSeleccionado;
        let especialidad = new Especialidad();
        especialidad.idespecialidad= this.idEspecialidadSeleccionado;

        this.personalmedico.tipopersonalmedico=tipopersonalmedico;
        this.personalmedico.especialidad=especialidad;

        if (this.personalmedico.dnipersonalmedico !=null&& this.personalmedico.nombrespersonalmedico!=null&& this.personalmedico.fechanacimientopersonalmedico!=null&& this.personalmedico.tipopersonalmedico
          !=null) {
            this.personalmedicoService.registrarPersonalMedico(this.personalmedico).subscribe(data => {
          
              this.personalmedicoService.listarPersonalMedico().subscribe(personalemedicos => {
                this.personalmedicoService.personalCambio.next(personalemedicos);
                this.personalmedicoService.mensaje.next("Se registró correctamente");
              });
            
          });
          this.dialogRef.close();
        }else{
          this.personalmedicoService.mensaje.next('Falta algún dato requerido del personal médico');
        }

      }
     
    }
  
    cancelar(){
      this.dialogRef.close();
      this.personalmedicoService.mensaje.next('Se canceló el procedimiento');
    }
    

}
