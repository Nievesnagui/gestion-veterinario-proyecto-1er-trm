package net.ausiasmarch.gestionveterinario.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import net.ausiasmarch.gestionveterinario.entity.VeterinarioEntity;

public interface VeterinarioRepository extends JpaRepository<VeterinarioEntity, Long> {

    /*
     * Optional<VeterinarioEntity> findByUsername(String username);
     * 
     * Optional<VeterinarioEntity> findByUsernameAndPassword(String username, String
     * password);
     * 
     * @Modifying
     * 
     * @Query(value = "ALTER TABLE user AUTO_INCREMENT = 1", nativeQuery = true)
     * void resetAutoIncrement();
     */

    Optional<VeterinarioEntity> findByUsername(String username);

    Optional<VeterinarioEntity> findByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT u.*,count(r.id) FROM veterinario u, cita r WHERE u.id = r.id_veterinario GROUP BY u.id ORDER BY COUNT(u.id) desc", nativeQuery = true)
    Page<VeterinarioEntity> findVetssByCitasNumberDescFilter(Pageable pageable);

    @Modifying
    @Query(value = "ALTER TABLE vet AUTO_INCREMENT = 1", nativeQuery = true)
    void resetAutoIncrement();

}
