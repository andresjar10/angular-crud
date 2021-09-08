import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';
import { ServiciosUsuario } from 'src/app/servicios/ServiciosUsuario';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrls: ['./informacion-usuario.component.css']
})
export class InformacionUsuarioComponent implements OnInit {

  @Input() arregloUsuarios: Usuario[];
  @Output() arregloUsuariosChange: EventEmitter<Usuario[]> = new EventEmitter();
  @Input() usuarioSeleccionado: Usuario = new Usuario();
  @Output() usuarioSeleccionadoChange: EventEmitter<Usuario> = new EventEmitter();
  @Input() inactivarGuardar: boolean;
  @Output() inactivarGuardarChange: EventEmitter<boolean> = new EventEmitter();
  @Input() inactivarEditElimi: boolean;
  @Output() inactivarEditElimiChange: EventEmitter<boolean> = new EventEmitter();
  @Input() cantidadUsuarios: number;
  @Output() cantidadUsuariosChange: EventEmitter<number> = new EventEmitter();

  constructor(private serviciosUsuario: ServiciosUsuario) { }

  ngOnInit(): void {
  }

  guardar(){
    this.usuarioSeleccionado.id = this.cantidadUsuarios + 1;

    this.serviciosUsuario.crearUsuario(this.usuarioSeleccionado).subscribe(
      usuario => {
        this.usuarioSeleccionado.id = usuario.id;
        this.arregloUsuarios.push(this.usuarioSeleccionado);
        this.cantidadUsuarios = this.arregloUsuarios.length;
        this.cantidadUsuariosChange.emit(this.cantidadUsuarios);
        this.usuarioSeleccionado = new Usuario();
        this.usuarioSeleccionadoChange.emit(this.usuarioSeleccionado);
        this.arregloUsuariosChange.emit(this.arregloUsuarios);
        this.inactivarGuardar = false;
        this.inactivarEditElimi = true;
        this.inactivarGuardarChange.emit(false);
        this.inactivarEditElimiChange.emit(true);
        console.log('informacion inactivarGuardar', this.inactivarGuardar);
        console.log('informacion inactivarEditElimiChange', this.inactivarEditElimi);
      },
      error => {
        console.log('Error al consumir el servicio crear usuario', error);
      }
    );
  }



  editar(){

    this.inactivarEditElimi = true;
    this.inactivarGuardar = false;

    this.serviciosUsuario.editarUsuario(this.usuarioSeleccionado).subscribe(
      usuario => {
        this.usuarioSeleccionado = usuario;
        this.usuarioSeleccionado = new Usuario();

      },
      error => {
        console.log('Error al consumir el servicio editar usuario', error);
      }
    );
  }

  eliminar(){

    this.serviciosUsuario.eliminarUsuario(this.usuarioSeleccionado.id).subscribe(
      usuario => {
        // TODO: editar arreglo
        this.cargarInformacionUsuarios();
        this.usuarioSeleccionado = new Usuario();
        this.inactivarEditElimi = true;
        this.inactivarGuardar = false;
        this.inactivarEditElimiChange.emit(true);
        this.inactivarGuardarChange.emit(false);
        this.usuarioSeleccionadoChange.emit(this.usuarioSeleccionado);
        this.cantidadUsuarios = this.arregloUsuarios.length;
        this.cantidadUsuariosChange.emit(this.cantidadUsuarios);
      },
      error => {
        console.log('Error al consumir el servicio eliminar usuario', error);
      }
    );

  }

  cargarInformacionUsuarios(): void {
    this.serviciosUsuario.consultarUsuarios().subscribe(
      usuarios => {
        this.arregloUsuarios = usuarios;
        this.arregloUsuariosChange.emit(usuarios);
      },
      error => {
        console.log('Error al consumir el servicio consultar usuarios', error);
      }
    )
  }

}
