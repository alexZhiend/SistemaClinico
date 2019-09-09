import { Proveedor } from './proveedor';
import { Categoriaproducto } from './categoriaproducto';
import { Presentacionproducto } from './presentacion';

export class Producto{
    idproducto: number;
    nombreproducto: string;
    fvproducto: string;
    cantidadproducto: number;
    pventaproducto: number;
    pingresoproducto: number;
    marcaproducto: string;
    loteproducto: string;
    fingresoproducto: string;
    proveedor: Proveedor;
    categoriaproducto: Categoriaproducto;
    presentacionproducto:Presentacionproducto;
}