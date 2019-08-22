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
    TipopersonalmedicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
