import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { BusquedaUsuarioComponent } from './busqueda-usuario/busqueda-usuario.component';


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    InformacionUsuarioComponent,
    BusquedaUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    ListaUsuariosComponent,
    InformacionUsuarioComponent,
    BusquedaUsuarioComponent
  ]
})
export class GestionUsuariosModule { }
