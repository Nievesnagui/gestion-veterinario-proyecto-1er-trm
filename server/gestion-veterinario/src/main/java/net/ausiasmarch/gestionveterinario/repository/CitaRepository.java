package net.ausiasmarch.gestionveterinario.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import net.ausiasmarch.gestionveterinario.entity.CitaEntity;

public interface CitaRepository extends JpaRepository<CitaEntity, Long> {
    Page<CitaEntity> findByVeterinarioId(Long id, Pageable pageable);

    Page<CitaEntity> findByMascotaId(Long id, Pageable pageable);

    /*Esto es nuevo de él */
    @Modifying
    @Query(value = "ALTER TABLE reply AUTO_INCREMENT = 1", nativeQuery = true)
    void resetAutoIncrement();
}
