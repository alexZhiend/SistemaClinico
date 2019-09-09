import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaexamenmedicoComponent } from './pages/categoriaexamenmedico/categoriaexamenmedico.component';
import { CategoriaproductoComponent } from './pages/categoriaproducto/categoriaproducto.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ServiciomedicoComponent } from './pages/serviciomedico/serviciomedico.component';
import { TipopacienteComponent } from './pages/tipopaciente/tipopaciente.component';
import { TipopersonalmedicoComponent } from './pages/tipopersonalmedico/tipopersonalmedico.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaexamenmedicoEdicionComponent } from './pages/categoriaexamenmedico/categoriaexamenmedico-edicion/categoriaexamenmedico-edicion.component';
import { CategoriaproductoEdicionComponent } from './pages/categoriaproducto/categoriaproducto-edicion/categoriaproducto-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { PresentacionEdicionComponent } from './pages/presentacion/presentacion-edicion/presentacion-edicion.component';
import { ProveedorEdicionComponent } from './pages/proveedor/proveedor-edicion/proveedor-edicion.component';
import { ServiciomedicoEdicionComponent } from './pages/serviciomedico/serviciomedico-edicion/serviciomedico-edicion.component';
import { TipopacienteEdicionComponent } from './pages/tipopaciente/tipopaciente-edicion/tipopaciente-edicion.component';
import { TipopersonalmedicoEdicionComponent } from './pages/tipopersonalmedico/tipopersonalmedico-edicion/tipopersonalmedico-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { ExamenmedicoComponent } from './pages/examenmedico/examenmedico.component';
import { PersonalmedicoComponent } from './pages/personalmedico/personalmedico.component';
import { ComprobantepagoComponent } from './pages/comprobantepago/comprobantepago.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { OrdenComponent } from './pages/orden/orden.component';
import { ExamenesgeneralesComponent } from './pages/examenesgenerales/examenesgenerales.component';
import { HematogramaComponent } from './pages/hematograma/hematograma.component';
import { HematogramacComponent } from './pages/hematogramac/hematogramac.component';
import { UrocultivoComponent } from './pages/urocultivo/urocultivo.component';
import { HecesComponent } from './pages/heces/heces.component';
import { SecrecionesComponent } from './pages/secreciones/secreciones.component';
import { OrinaComponent } from './pages/orina/orina.component';
import { AglutinacionesComponent } from './pages/aglutinaciones/aglutinaciones.component';
import { CoprofuncionalComponent } from './pages/coprofuncional/coprofuncional.component';
import { DialogproductoComponent } from './pages/producto/dialogproducto/dialogproducto.component';
import { DialogexamenmedicoComponent } from './pages/examenmedico/dialogexamenmedico/dialogexamenmedico.component';
import { DialogpacienteComponent } from './pages/paciente/dialogpaciente/dialogpaciente.component';
import { DialogPersonalmedicoComponent } from './pages/personalmedico/dialog-personalmedico/dialog-personalmedico.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaexamenmedicoComponent,
    CategoriaproductoComponent,
    EspecialidadComponent,
    PresentacionComponent,
    ProveedorComponent,
    ServiciomedicoComponent,
    TipopacienteComponent,
    TipopersonalmedicoComponent,
    CategoriaexamenmedicoEdicionComponent,
    CategoriaproductoEdicionComponent,
    EspecialidadEdicionComponent,
    PresentacionEdicionComponent,
    ProveedorEdicionComponent,
    ServiciomedicoEdicionComponent,
    TipopacienteEdicionComponent,
    TipopersonalmedicoEdicionComponent,
    PacienteComponent,
    ExamenmedicoComponent,
    PersonalmedicoComponent,
    ComprobantepagoComponent,
    ProductoComponent,
    OrdenComponent,
    ExamenesgeneralesComponent,
    HematogramaComponent,
    HematogramacComponent,
    UrocultivoComponent,
    HecesComponent,
    SecrecionesComponent,
    OrinaComponent,
    AglutinacionesComponent,
    CoprofuncionalComponent,
    DialogproductoComponent,
    DialogexamenmedicoComponent,
    DialogpacienteComponent,
    DialogPersonalmedicoComponent
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[DialogproductoComponent,DialogexamenmedicoComponent, DialogpacienteComponent, DialogPersonalmedicoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
