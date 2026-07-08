package com.gimnasio.grupo8.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "socio")
@Data
public class Socio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSocio")
    private Integer idSocio;

    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String correo;
    private String direccion;
    private String estado;
    private String foto;
}