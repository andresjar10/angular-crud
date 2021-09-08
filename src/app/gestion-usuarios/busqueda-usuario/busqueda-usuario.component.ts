import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';
import { ServiciosUsuario } from 'src/app/servicios/ServiciosUsuario';

@Component({
  selector: 'app-busqueda-usuario',
  templateUrl: './busqueda-usuario.component.html',
  styleUrls: ['./busqueda-usuario.component.css']
})
export class BusquedaUsuarioComponent implements OnInit {

  @Input('usuarioBuscado') cadena: string;
  @Output() usuarioBuscadoChange: EventEmitter<string> = new EventEmitter();
  @Input() arregloUsuarios: Usuario[];
  @Output() arregloUsuariosChange: EventEmitter<Usuario[]> = new EventEmitter();
  @Input() cantidadUsuarios: number;
  @Output() cantidadUsuariosChange: EventEmitter<number> = new EventEmitter();

  constructor(private serviciosUsuario: ServiciosUsuario) { }

  ngOnInit(): void {
  }

  consultar(): void {

    this.serviciosUsuario.cosultarUsuarioPorNombre(this.cadena).subscribe(
      usuarios => {

        this.cantidadUsuarios = this.arregloUsuarios.length;
        // Se emite el valor para poder crear un usuario con el id correcto
        this.cantidadUsuariosChange.emit(this.cantidadUsuarios);
        this.arregloUsuarios = [{id:0, nombre: 'No se encontraron registros'}];

        if(usuarios.length > 0){
          this.arregloUsuarios = usuarios;
        }

        this.arregloUsuariosChange.emit(this.arregloUsuarios);
      },
      error => {
        console.log('Error al consumir el servicio consultar usuario', error);
      }
    )
  }

  limpiar(): void {

    this.cadena = '';
    this.cargarInformacionUsuarios();
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
