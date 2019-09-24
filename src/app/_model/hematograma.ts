import { HematogramaC } from './hematogramaC';
import { ComprobantePago } from 'src/app/_model/comprobantepago';
export class Hematograma{
    idhematograma: number;
    hemoglobina:string;
    hematocrito:string;
    gruposanguineo:string;
    rh:string;
    hematies:string;
    leucocitos:string;
    plaquetas:string;
    tcoagulacion:string;
    tsangria:string;
    vsg:string;
    observaciones:string;
    fecha:Date;
    comprobantepago: ComprobantePago;
    hematogramacompleto: HematogramaC;
    tipo:string;
}