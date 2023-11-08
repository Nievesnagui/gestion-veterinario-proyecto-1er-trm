package net.ausiasmarch.gestionveterinario.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import net.ausiasmarch.gestionveterinario.entity.VeterinarioEntity;

public interface VeterinarioRepository extends JpaRepository<VeterinarioEntity, Long> {

   
    Optional<VeterinarioEntity> findByUsername(String username);

    Optional<VeterinarioEntity> findByUsernameAndPassword(String username, String password);

    @Modifying
    @Query(value = "ALTER TABLE user AUTO_INCREMENT = 1", nativeQuery = true)
    void resetAutoIncrement();

}
