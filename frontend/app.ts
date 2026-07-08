import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocioService, Socio } from './services/socio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  socios: Socio[] = [];
  sociosFiltrados: Socio[] = [];
  
  socioForm: Socio = this.inicializarSocio();
  buscarNombre: string = '';
  editando: boolean = false;

  constructor(private socioService: SocioService) {}

  ngOnInit(): void {
    this.listar();
  }

  inicializarSocio(): Socio {
    return { idSocio: 0, nombre: '', apellido: '', dni: '', telefono: '', correo: '', direccion: '', estado: 'Activo', foto: 'default.jpg' };
  }

  listar(): void {
    this.socioService.listar().subscribe({
      next: (data) => {
        this.socios = data;
        this.sociosFiltrados = data;
      },
      error: (err) => console.error('Error al mapear datos del backend:', err)
    });
  }

  buscar(): void {
    if (this.buscarNombre.trim() === '') {
      this.sociosFiltrados = this.socios;
    } else {
      this.sociosFiltrados = this.socios.filter(s => 
        s.nombre.toLowerCase().includes(this.buscarNombre.toLowerCase())
      );
    }
  }

  guardarOActualizar(): void {
    if (this.editando && this.socioForm.idSocio) {
      this.socioService.actualizar(this.socioForm.idSocio, this.socioForm).subscribe(() => {
        this.listar();
        this.cancelar();
      });
    } else {
      const { idSocio, ...nuevoSocio } = this.socioForm;
      this.socioService.guardar(nuevoSocio as Socio).subscribe(() => {
        this.listar();
        this.cancelar();
      });
    }
  }

  seleccionarEditar(socio: Socio): void {
    this.socioForm = { ...socio };
    this.editando = true;
  }

  eliminar(id?: number): void {
    if (id && confirm('¿Está seguro que desea eliminar este socio?')) {
      this.socioService.eliminar(id).subscribe(() => {
        this.listar();
      });
    }
  }

  nuevo(): void {
    this.cancelar();
  }

  cancelar(): void {
    this.socioForm = this.inicializarSocio();
    this.editando = false;
  }
}