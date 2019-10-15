import { Proveedor } from './proveedor';
import { Categoriaproducto } from './categoriaproducto';
import { Presentacionproducto } from './presentacion';

export class Producto{
    idproducto: number;
    nombreproducto: string;
    fvproducto: Date;
    cantidadproducto: number;
    pventaproducto: number;
    pingresoproducto: number;
    marcaproducto: string;
    loteproducto: string;
    fingresoproducto: Date;
    proveedor: Proveedor;
    categoriaproducto: Categoriaproducto;
    presentacionproducto:Presentacionproducto;
}