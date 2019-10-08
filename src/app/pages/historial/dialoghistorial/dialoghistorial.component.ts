import { ServiciomedicoService } from 'src/app/_service/serviciomedico.service';
import { Serviciomedico } from './../../../_model/serviciomedico';
import { PersonalmedicoService } from './../../../_service/personalmedico.service';
import { HistorialService } from './../../../_service/historial.service';
import { PacienteService } from './../../../_service/paciente.service';
import { Personalmedico } from './../../../_model/personalmedico';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Historial } from './../../../_model/historial';
import { Paciente } from 'src/app/_model/paciente';
import { Component, OnInit, Inject } from '@angular/core';
import { MatAutocompleteSelectedEvent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-dialoghistorial',
  templateUrl: './dialoghistorial.component.html',
  styleUrls: ['./dialoghistorial.component.css']
})
export class DialoghistorialComponent implements OnInit {
  historial = new Historial();
  personalmedico = new Personalmedico();

  pacientes: Paciente[] = [];
  personalmedicos: Personalmedico[] = [];
  serviciosmedicos: Serviciomedico[] = [];

  paciente = new FormControl();
  personal = new FormControl();

  form:FormGroup;
  form1:FormGroup;
  filteredOptions: Observable<Paciente[]>;
  filteredOptions1: Observable<Personalmedico[]>;

  pacienteseleccionado: Paciente;
  personalseleccionado: Personalmedico;
  serviciomedicoseleccionado: string;

  idpacienteseleccionado: string;
  idpersonalseleccionado: string;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DialoghistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Historial,
    private pacienteService: PacienteService,
    private historialService: HistorialService,
    private personalmedicoService: PersonalmedicoService,
    private serviciomedicoService: ServiciomedicoService) {
      this.form=new FormGroup({
        'paciente': new FormControl(null),
      });
      this.form1=new FormGroup({
        'personal': new FormControl(null),
      });
  }

  ngOnInit() {
    this.listarPaciente();
    this.listarPersonal();
    this.listarservicio();

    this.historial = new Historial();
    this.historial.idhistoriaclinica = this.data.idhistoriaclinica;
    this.historial.anamnesis = this.data.anamnesis;
    this.historial.diagnostico = this.data.diagnostico;
    this.historial.edad = this.data.edad;
    this.historial.evaluacion = this.data.evaluacion;
    this.historial.examenes = this.data.examenes;
    this.historial.fechaexpediciconhistoriaclinica = this.data.fechaexpediciconhistoriaclinica;
    this.historial.frecuenciacardiaca = this.data.frecuenciacardiaca;
    this.historial.frecuenciarespiratoria = this.data.frecuenciarespiratoria;
    this.historial.malestares = this.data.malestares;
    this.historial.peso = this.data.peso;
    this.historial.presionarterial = this.data.presionarterial;
    this.historial.serviciomedico = this.data.serviciomedico;
    this.historial.talla = this.data.talla;
    this.historial.temperatura = this.data.temperatura;
    this.historial.tratamiento = this.data.tratamiento;
    this.historial.reconsulta= this.data.reconsulta;

    if (this.data.idhistoriaclinica != null) {
      this.paciente.setValue(this.data.paciente);
      this.personal.setValue(this.data.personalmedico);
      this.serviciomedicoseleccionado = this.data.serviciomedico;
    }



    this.filteredOptions = this.paciente.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombresyapellidos),
      map(nombresyapellidos => nombresyapellidos ? this._filter(nombresyapellidos) : this.pacientes.slice())
    );

    this.filteredOptions1 = this.personal.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombrespersonalmedico),
      map(nombrespersonalmedico => nombrespersonalmedico ? this._filter1(nombrespersonalmedico) : this.personalmedicos.slice())
    );
  }

  listarservicio() {
    this.serviciomedicoService.listarServicioMedico().subscribe(data => {
      this.serviciosmedicos = data;
    });
  }

  listarPaciente() {
    this.pacienteService.listarpaciente().subscribe(data => {
      this.pacientes = data;
    });
  }


  listarPersonal() {
    this.personalmedicoService.listarPersonalMedico().subscribe(data => {
      this.personalmedicos = data;
    });
  }

  displayFn(paciente?: Paciente): string | undefined {
    return paciente ? paciente.nombresyapellidos : undefined;
  }

  displayFn1(personalmedico?: Personalmedico): string | undefined {
    return personalmedico ? personalmedico.nombrespersonalmedico : undefined;
  }

  private _filter(nombresyapellidos: string): Paciente[] {
    const filterValue = nombresyapellidos.toLowerCase();
    return this.pacientes.filter(paciente => paciente.nombresyapellidos.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter1(nombrespersonalmedico: string): Personalmedico[] {
    const filterValue = nombrespersonalmedico.toLowerCase();
    return this.personalmedicos.filter(personal => personal.nombrespersonalmedico.toLowerCase().indexOf(filterValue) === 0);
  }


  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.pacienteseleccionado = event.option.value;
    this.idpacienteseleccionado = this.pacienteseleccionado.hcl;
    console.log(this.pacienteseleccionado)
  }

  onSelectionChanged1(event: MatAutocompleteSelectedEvent) {
    this.personalseleccionado = event.option.value;
    console.log(this.personalseleccionado)
  }

  operar() {
    if (this.historial != null && this.historial.idhistoriaclinica > 0) {

      let paciente = new Paciente();
      paciente.hcl=this.data.paciente.hcl;
      this.pacienteseleccionado=paciente;
      this.historial.paciente = paciente;

      let personalselec = new Personalmedico();
      personalselec.dnipersonalmedico=this.data.personalmedico.dnipersonalmedico;

      this.historial.personalmedico = personalselec;
      this.historial.serviciomedico = this.serviciomedicoseleccionado;

      console.log(this.historial);

      this.historialService.modificarHistorial(this.historial).subscribe(data => {

        this.historialService.listarHistorial().subscribe(historia => {
          this.historialService.historialCambio.next(historia);
          this.historialService.mensaje.next("Se modificó correctamente");
        });
        this.dialogRef.close();
      });

    } else {

      if (this.paciente.valid && this.personal.valid === true) {

        let paciente = new Paciente();
        let personalselec = new Personalmedico();
        paciente.hcl = this.pacienteseleccionado.hcl;
        personalselec.dnipersonalmedico = this.personalseleccionado.dnipersonalmedico;
        this.historial.paciente = paciente;
        this.historial.personalmedico = personalselec;
        this.historial.serviciomedico = this.serviciomedicoseleccionado;

        console.log(this.historial);

        this.historialService.registrarHistorial(this.historial).subscribe(data => {

          this.historialService.listarHistorial().subscribe(historia => {
            this.historialService.historialCambio.next(historia);
            this.historialService.mensaje.next("Se registró correctamente");
          });
          this.dialogRef.close();
        });

      } else {
        this.historialService.mensaje.next('Falta algún dato requerido');
      }

    }

  }

  cancelar() {
    this.dialogRef.close();
    this.historialService.mensaje.next('se canceló el procedimiento');
  }


}
