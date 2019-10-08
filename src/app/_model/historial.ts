import { Paciente } from 'src/app/_model/paciente';
import { Personalmedico } from './personalmedico';
export class Historial{
    idhistoriaclinica:number;
    fechaexpediciconhistoriaclinica:Date;
    serviciomedico:string;
    edad:number;
    peso:number;
    talla:number;
    presionarterial:number;
    frecuenciacardiaca:number;
    frecuenciarespiratoria:number;
    temperatura:number;
    malestares:string;
    anamnesis:string;
    evaluacion:string;
    diagnostico:string;
    tratamiento:string;
    examenes:string;
    personalmedico:Personalmedico;
    paciente:Paciente;
    reconsulta:string;
}