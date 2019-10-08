import { ComprobantePago } from './comprobantepago';
import { ExamenMedico } from './examenmedico';

export class DetalleComprobante{
    iddetallecomprobante: number;
    cantidad:number
    comprobantepago:ComprobantePago;
    examenMedico:ExamenMedico;
    importe:number;
}