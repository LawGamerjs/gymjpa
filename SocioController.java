package com.gimnasio.grupo8.controller;

import com.gimnasio.grupo8.entity.Socio;
import com.gimnasio.grupo8.repository.SocioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/socios")
@CrossOrigin(origins = "*") 
public class SocioController {

    @Autowired
    private SocioRepository socioRepository;

    @GetMapping
    public List<Socio> listarTodos() {
        return socioRepository.findAll();
    }

    @PostMapping
    public Socio guardarSocio(@RequestBody Socio socio) {
        return socioRepository.save(socio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Socio> actualizarSocio(@PathVariable Integer id, @RequestBody Socio datosActualizados) {
        Socio socio = socioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Socio no encontrado con el ID: " + id));

        socio.setNombre(datosActualizados.getNombre());
        socio.setApellido(datosActualizados.getApellido());
        socio.setDni(datosActualizados.getDni());
        socio.setTelefono(datosActualizados.getTelefono());
        socio.setCorreo(datosActualizados.getCorreo());
        socio.setDireccion(datosActualizados.getDireccion());
        socio.setEstado(datosActualizados.getEstado());
        socio.setFoto(datosActualizados.getFoto());

        Socio socioGuardado = socioRepository.save(socio);
        return ResponseEntity.ok(socioGuardado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSocio(@PathVariable Integer id) {
        socioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}