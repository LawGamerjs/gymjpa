package com.gimnasio.grupo8.repository;

import com.gimnasio.grupo8.entity.Socio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocioRepository extends JpaRepository<Socio, Integer> {
}