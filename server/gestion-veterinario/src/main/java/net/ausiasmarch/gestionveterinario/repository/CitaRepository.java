package net.ausiasmarch.gestionveterinario.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import net.ausiasmarch.gestionveterinario.entity.CitaEntity;

public interface CitaRepository extends JpaRepository<CitaEntity, Long> {
    Page<CitaEntity> findByVeterinarioId(Long id, Pageable pageable);
}
