import { DetalleComprobante } from './detallecomprobante';
import { Paciente } from 'src/app/_model/paciente';
import { Serviciomedico } from './serviciomedico';
export class ComprobantePago{
    idcomprobantepago:number;
    fechacomprobante:Date;
    numerorecibocomprobante:number;
    paciente:Paciente;
    serviciomedico:Serviciomedico;
    detallecomprobante:DetalleComprobante[];
    cantidadfarmacia:number;
    cantidadotros:number;
    cantidadtopico:number;
}