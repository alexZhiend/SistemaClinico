import { Especialidad } from './especialidad';
import { Tipopersonalmedico } from 'src/app/_model/tipopersonalmedico';
export class Personalmedico{
    dnipersonalmedico:string;
    nombrespersonalmedico:string;
    apellidospersonalmedico:string;
    correopersonalmedico:string;
    telefonopersonalmedico:string;
    rnepersonalmedico:string;
    cmppersonalmedico:string;
    areapersonalmedico:string;
    fechanacimientopersonalmedico: string;
    estadocivilpersonalmedico: string;
    tipopersonalmedico: Tipopersonalmedico;
    especialidad: Especialidad
}