package net.ausiasmarch.gestionveterinario.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import net.ausiasmarch.gestionveterinario.entity.MascotaEntity;

public interface MascotaRepository extends JpaRepository<MascotaEntity, Long>{
  /*  Page<MascotaEntity> findByUserId(Long id, Pageable pageable);

    @Query(value = "SELECT t.*,count(r.id) FROM mascota t, cita r WHERE t.id = r.id_mascota GROUP BY t.id ORDER BY COUNT(r.id) desc", nativeQuery = true)
    Page<MascotaEntity> findPetsByCitasNumberDesc(Pageable pageable);

    @Query(value = "SELECT t.*,count(r.id) FROM mascota t, cita r WHERE t.id = r.id_mascota and t.id_veterinario=$1 GROUP BY t.id ORDER BY COUNT(r.id) desc", nativeQuery = true)
    Page<MascotaEntity> findPetsByCitasNumberDescFilterByVetId(Long id, Pageable pageable);

    @Modifying
    @Query(value = "ALTER TABLE thread AUTO_INCREMENT = 1", nativeQuery = true)
    void resetAutoIncrement(); */
}
