import { GramPositivo } from './grampositivo';
import { GramNegativo } from './gramnegativo';
import { ComprobantePago } from './comprobantepago';
export class Urocultivo{
    idurocultivo: number;
    leucocitos:string;
    hematies:string;
    cepiteliales:string;
    cristales:string;
    germenes:string;
    otros:string;
    numero:number;
    germenaislado:string;
    observaciones:string;
    antibiograma:string;
    fecha:Date;
    cilindros:string;
    gramnegativo:GramNegativo;
    grampositivo:GramPositivo;
    comprobantepago:ComprobantePago;
}