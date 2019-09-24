import { Examenesg } from './examenesg';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
export class DetalleExamen{
    iddetalleexamen:string;
    resultado:string;
    observaciones:string;
    fecha:Date;
    examenesg: Examenesg;
    comprobantepago: ComprobantePago;
}