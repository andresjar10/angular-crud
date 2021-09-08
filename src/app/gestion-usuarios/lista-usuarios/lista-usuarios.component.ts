import { ConstantPool } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';
import { ServiciosUsuario } from 'src/app/servicios/ServiciosUsuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

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

  constructor(private serviciosUsuario: ServiciosUsuario) {

   }

  ngOnInit(): void {
    this.cargarInformacionUsuarios();
  }

  cargarInformacionUsuarios(): void {
    this.serviciosUsuario.consultarUsuarios().subscribe(
      usuarios => {
        this.arregloUsuarios = usuarios;
        this.cantidadUsuarios = usuarios.length;
        this.cantidadUsuariosChange.emit(usuarios.length);
        this.arregloUsuariosChange.emit(usuarios);
      },
      error => {
        console.log('Error al consumir el servicio consultar usuarios', error);
      }
    )
  }

  cargarUsuarioAEditar(usuario: Usuario){
    console.log('usuario', usuario);
    console.log('usuarioSeleccionado', this.usuarioSeleccionado);
    this.usuarioSeleccionado = usuario;

    this.inactivarGuardar = true;
    this.inactivarEditElimi = false;
    this.usuarioSeleccionadoChange.emit(usuario);
    this.inactivarGuardarChange.emit(true);
    this.inactivarEditElimiChange.emit(false);
    console.log('lista inactivarGuardar', this.inactivarGuardar);
    console.log('lista inactivarEditElimiChange', this.inactivarEditElimi);
  }

  buscarUsuario() {

  }

}
