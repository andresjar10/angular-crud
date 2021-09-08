import { Component } from '@angular/core';
import { Usuario } from './modelo/Usuario';

/*import { HttpClient } from '@angular/common/http';

import { Usuario } from './modelo/Usuario';
import { ServiciosUsuario } from './servicios/ServiciosUsuario';
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  arregloUsuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario = new Usuario();

  inactivarGuardar = false;
  inactivarEditElimi = true;
  usuarioBuscado = '';
  cantidadUsuarios = 0;

  constructor() {

  }

  ngOnInit() {

  }

}
