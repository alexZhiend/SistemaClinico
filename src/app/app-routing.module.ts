import { UrocultivoComponent } from './pages/urocultivo/urocultivo.component';
import { HematogramacComponent } from './pages/hematogramac/hematogramac.component';
import { HematogramaComponent } from './pages/hematograma/hematograma.component';
import { HecesComponent } from './pages/heces/heces.component';
import { ExamenmedicoComponent } from './pages/examenmedico/examenmedico.component';
import { ExamenesgeneralesComponent } from './pages/examenesgenerales/examenesgenerales.component';
import { CoprofuncionalComponent } from './pages/coprofuncional/coprofuncional.component';
import { ComprobantepagoComponent } from './pages/comprobantepago/comprobantepago.component';
import { AglutinacionesComponent } from './pages/aglutinaciones/aglutinaciones.component';
import { ProveedorEdicionComponent } from './pages/proveedor/proveedor-edicion/proveedor-edicion.component';
import { PresentacionEdicionComponent } from './pages/presentacion/presentacion-edicion/presentacion-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { CategoriaexamenmedicoEdicionComponent } from './pages/categoriaexamenmedico/categoriaexamenmedico-edicion/categoriaexamenmedico-edicion.component';
import { CategoriaproductoEdicionComponent } from './pages/categoriaproducto/categoriaproducto-edicion/categoriaproducto-edicion.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { CategoriaexamenmedicoComponent } from './pages/categoriaexamenmedico/categoriaexamenmedico.component';
import { CategoriaproductoComponent } from './pages/categoriaproducto/categoriaproducto.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciomedicoComponent } from './pages/serviciomedico/serviciomedico.component';
import { TipopacienteComponent } from './pages/tipopaciente/tipopaciente.component';
import { TipopersonalmedicoComponent } from './pages/tipopersonalmedico/tipopersonalmedico.component';
import { ServiciomedicoEdicionComponent } from './pages/serviciomedico/serviciomedico-edicion/serviciomedico-edicion.component';
import { TipopacienteEdicionComponent } from './pages/tipopaciente/tipopaciente-edicion/tipopaciente-edicion.component';
import { TipopersonalmedicoEdicionComponent } from './pages/tipopersonalmedico/tipopersonalmedico-edicion/tipopersonalmedico-edicion.component';
import { OrdenComponent } from './pages/orden/orden.component';
import { OrinaComponent } from './pages/orina/orina.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PersonalmedicoComponent } from './pages/personalmedico/personalmedico.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { SecrecionesComponent } from './pages/secreciones/secreciones.component';

const routes: Routes = [ 
{path:'categoriaproducto', component: CategoriaproductoComponent, 
  children:[{path:'nuevo', component: CategoriaproductoEdicionComponent},
            {path:'edicion/:id', component:CategoriaproductoEdicionComponent}]
},
{path:'categoriaexamenmedico', component: CategoriaexamenmedicoComponent,
  children:[{path:'nuevo', component: CategoriaexamenmedicoEdicionComponent},
            {path:'edicion/:id', component:CategoriaexamenmedicoEdicionComponent}]
},
{path:'especialidad', component: EspecialidadComponent,
  children:[{path:'nuevo', component: EspecialidadEdicionComponent},
            {path:'edicion/:id', component:EspecialidadEdicionComponent}]
},
{path:'presentacion', component: PresentacionComponent,
  children:[{path:'nuevo', component: PresentacionEdicionComponent},
            {path:'edicion/:id', component:PresentacionEdicionComponent}]
},
{path:'proveedor', component: ProveedorComponent,
  children:[{path:'nuevo', component: ProveedorEdicionComponent},
            {path:'edicion/:id', component:ProveedorEdicionComponent}]
},
{path:'serviciomedico', component: ServiciomedicoComponent,
  children:[{path:'nuevo', component: ServiciomedicoEdicionComponent},
            {path:'edicion/:id', component:ServiciomedicoEdicionComponent}]
          },
{path:'tipopaciente', component: TipopacienteComponent,
  children:[{path:'nuevo', component: TipopacienteEdicionComponent},
            {path:'edicion/:id', component:TipopacienteEdicionComponent}]
},
{path:'tipopersonalmedico', component: TipopersonalmedicoComponent,
  children:[{path:'nuevo', component: TipopersonalmedicoEdicionComponent},
            {path:'edicion/:id', component:TipopersonalmedicoEdicionComponent}]
},
{path:'aglutinacionaf', component: AglutinacionesComponent},
{path:'comprobantepago',component:ComprobantepagoComponent},
{path:'coprofuncional',component:CoprofuncionalComponent},
{path:'examenesgenerales',component:ExamenesgeneralesComponent},
{path:'examenmedico',component:ExamenmedicoComponent},
{path:'analisisheces',component:HecesComponent},
{path:'hematograma',component:HematogramaComponent},
{path:'hematogramacompleto',component:HematogramacComponent},
{path:'ordenfarmacia',component:OrdenComponent},
{path:'analisisorina',component:OrinaComponent},
{path:'paciente',component:PacienteComponent},
{path:'personalmedico',component:PersonalmedicoComponent},
{path:'producto',component:ProductoComponent},
{path:'analisissecreciones',component:SecrecionesComponent},
{path:'urocultivo',component:UrocultivoComponent},
{path:'**',component:TipopacienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
