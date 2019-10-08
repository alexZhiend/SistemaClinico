import { Not403Component } from './pages/not403/not403.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './_service/guard.service';
import { HistorialComponent } from './pages/historial/historial.component';
import { DetalleegComponent } from './pages/detalleeg/detalleeg.component';
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
import { ExamenesgeneralesEdicionComponent } from './pages/examenesgenerales/examenesgenerales-edicion/examenesgenerales-edicion.component';

const routes: Routes = [ 
{path:'categoriaproducto', component: CategoriaproductoComponent, 
  children:[{path:'nuevo', component: CategoriaproductoEdicionComponent},
            {path:'edicion/:id', component:CategoriaproductoEdicionComponent}], canActivate:[GuardService]
},
{path:'categoriaexamenmedico', component: CategoriaexamenmedicoComponent,
  children:[{path:'nuevo', component: CategoriaexamenmedicoEdicionComponent},
            {path:'edicion/:id', component:CategoriaexamenmedicoEdicionComponent}], canActivate:[GuardService]
},
{path:'especialidad', component: EspecialidadComponent,
  children:[{path:'nuevo', component: EspecialidadEdicionComponent},
            {path:'edicion/:id', component:EspecialidadEdicionComponent}], canActivate:[GuardService]
},
{path:'presentacion', component: PresentacionComponent,
  children:[{path:'nuevo', component: PresentacionEdicionComponent},
            {path:'edicion/:id', component:PresentacionEdicionComponent}], canActivate:[GuardService]
},
{path:'proveedor', component: ProveedorComponent,
  children:[{path:'nuevo', component: ProveedorEdicionComponent},
            {path:'edicion/:id', component:ProveedorEdicionComponent}], canActivate:[GuardService]
},
{path:'serviciomedico', component: ServiciomedicoComponent,
  children:[{path:'nuevo', component: ServiciomedicoEdicionComponent},
            {path:'edicion/:id', component:ServiciomedicoEdicionComponent}], canActivate:[GuardService]
          },
{path:'tipopaciente', component: TipopacienteComponent,
  children:[{path:'nuevo', component: TipopacienteEdicionComponent},
            {path:'edicion/:id', component:TipopacienteEdicionComponent}], canActivate:[GuardService]
},
{path:'tipopersonalmedico', component: TipopersonalmedicoComponent,
  children:[{path:'nuevo', component: TipopersonalmedicoEdicionComponent},
            {path:'edicion/:id', component:TipopersonalmedicoEdicionComponent}], canActivate:[GuardService]
},
{path:'aglutinacionaf', component: AglutinacionesComponent, canActivate:[GuardService]},
{path:'comprobantepago',component:ComprobantepagoComponent, canActivate:[GuardService]},
{path:'coprofuncional',component:CoprofuncionalComponent, canActivate:[GuardService]},
{path:'examenesgenerales',component:ExamenesgeneralesComponent, 
  children:[{path:'nuevo',component:ExamenesgeneralesEdicionComponent},
            {path:'edicion/:id', component:ExamenesgeneralesEdicionComponent}
], canActivate:[GuardService]},
{path:'examenmedico',component:ExamenmedicoComponent, canActivate:[GuardService]},
{path:'analisisheces',component:HecesComponent, canActivate:[GuardService]},
{path:'historial',component:HistorialComponent, canActivate:[GuardService]},
{path:'hematograma',component:HematogramaComponent, canActivate:[GuardService]},
{path:'hematogramacompleto',component:HematogramacComponent, canActivate:[GuardService]},
{path:'ordenfarmacia',component:OrdenComponent, canActivate:[GuardService]},
{path:'analisisorina',component:OrinaComponent, canActivate:[GuardService]},
{path:'paciente',component:PacienteComponent, canActivate:[GuardService]},
{path:'personalmedico',component:PersonalmedicoComponent, canActivate:[GuardService]},
{path:'detalleexamengeneral', component:DetalleegComponent, canActivate:[GuardService]},
{path:'producto',component:ProductoComponent, canActivate:[GuardService]},
{path:'analisissecreciones',component:SecrecionesComponent, canActivate:[GuardService]},
{path:'urocultivo',component:UrocultivoComponent, canActivate:[GuardService]},
{path: "login", component: LoginComponent},
{ path: 'not-403', component: Not403Component },
{path: "", redirectTo:'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
