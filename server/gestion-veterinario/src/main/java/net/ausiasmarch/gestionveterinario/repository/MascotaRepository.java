package net.ausiasmarch.gestionveterinario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.ausiasmarch.gestionveterinario.entity.MascotaEntity;

public interface MascotaRepository extends JpaRepository<MascotaEntity, Long>{
    
}
