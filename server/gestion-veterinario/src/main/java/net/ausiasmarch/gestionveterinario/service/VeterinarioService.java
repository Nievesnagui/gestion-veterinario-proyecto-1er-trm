package net.ausiasmarch.gestionveterinario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import net.ausiasmarch.gestionveterinario.entity.VeterinarioEntity;
import net.ausiasmarch.gestionveterinario.exception.ResourceNotFoundException;
import net.ausiasmarch.gestionveterinario.helper.DataGenerationHelper;
import net.ausiasmarch.gestionveterinario.repository.VeterinarioRepository;

@Service
public class VeterinarioService {
    @Autowired
    VeterinarioRepository oVeterinarioRepository;

    @Autowired
    HttpServletRequest oHttpServletRequest;

    @Autowired
    SessionService oSessionService;

    private final String genericPasswd = "e2cac5c5f7e52ab03441bb70e89726ddbd1f6e5b683dde05fb65e0720290179e";

    public VeterinarioEntity get(Long id) {
        return oVeterinarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Veterinario not found"));
    }

    public VeterinarioEntity getByUsername(String username) {
        return oVeterinarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found by username"));
    }

    public Long create(VeterinarioEntity oVeterinarioEntity) {
        oSessionService.onlyAdmins();
        oVeterinarioEntity.setId(null);
        oVeterinarioEntity.setPassword(genericPasswd);
        return oVeterinarioRepository.save(oVeterinarioEntity).getId();
        // tenia esto antes: return oVeterinarioRepository.save(oVeterinarioEntity);

    }

    public VeterinarioEntity update(VeterinarioEntity oVeterinarioEntity) {

        
          VeterinarioEntity oVeterinarioEntityAux =
          oVeterinarioRepository.findById(oVeterinarioEntity.getId())
          .orElseThrow(() -> new ResourceNotFoundException("Veterinario not found"));
          oVeterinarioEntityAux.setName(oVeterinarioEntity.getName());
          oVeterinarioEntityAux.setSurname(oVeterinarioEntity.getSurname());
          oVeterinarioEntityAux.setEmail(oVeterinarioEntity.getEmail());
          oVeterinarioEntityAux.setUsername(oVeterinarioEntity.getUsername());
         oVeterinarioEntityAux.setDni(oVeterinarioEntity.getDni());
         oVeterinarioEntityAux.setPhone(oVeterinarioEntity.getPhone());
          return oVeterinarioRepository.save(oVeterinarioEntityAux);
        

         
   

    }
    /*
     * public VeterinarioEntity delete(Long id) {
     * VeterinarioEntity oVeterinarioEntityAux = oVeterinarioRepository.findById(id)
     * .orElseThrow(() -> new ResourceNotFoundException("Veterinario not found"));
     * oVeterinarioRepository.deleteById(id);
     * return oVeterinarioEntityAux;
     * }
     */

    /* Este es copiado del suyo nuevo */
    public Long delete(Long id) {
       oSessionService.onlyAdmins();
        oVeterinarioRepository.deleteById(id);
        return id;
    }

    public VeterinarioEntity getOneRandom() {
       oSessionService.onlyAdmins();
        Pageable oPageable = PageRequest.of((int) (Math.random() * oVeterinarioRepository.count()), 1);
        return oVeterinarioRepository.findAll(oPageable).getContent().get(0);
    }

    public Page<VeterinarioEntity> getPage(Pageable oPageable) {
         oSessionService.onlyAdmins();
        return oVeterinarioRepository.findAll(oPageable);
    }

    public Page<VeterinarioEntity> getPageByRepliesNumberDesc(Pageable oPageable) {
        return oVeterinarioRepository.findUsersByRepliesNumberDescFilter(oPageable);
    }

    public Long populate(Integer amount) {
        oSessionService.onlyAdmins();

        for (int i = 0; i < amount; i++) {
            String password = "unapasswordsegura12345567789976543" + i;
            String name = DataGenerationHelper.getRadomName();
            String surname = DataGenerationHelper.getRadomSurname();
            String email = name.substring(0, 3) + surname.substring(0, 3) + i
                    + "@ausiasmarch.net";
            String username = DataGenerationHelper
                    .doNormalizeString(
                            name.substring(0, 3) + surname.substring(1, 3) + i);
            oVeterinarioRepository.save(
                    new VeterinarioEntity(name, surname, email, username, password,
                            "32323232r", "648956235", true));
        }
        return oVeterinarioRepository.count();

    }

    @Transactional
    public Long empty() {
        oSessionService.onlyAdmins();
        oVeterinarioRepository.deleteAll();
        // oVeterinarioRepository.resetAutoIncrement();
        VeterinarioEntity oVeterinarioEntity1 = new VeterinarioEntity("Admin", "Apellido", "mail@mail.com",
                "useradmin", "e2cac5c5f7e52ab03441bb70e89726ddbd1f6e5b683dde05fb65e0720290179e", "32569874A",
                "658945123", false);
        oVeterinarioRepository.save(oVeterinarioEntity1);
        oVeterinarioEntity1 = new VeterinarioEntity("User", "Apellido", "mail@mail.com",
                "useruser", "e2cac5c5f7e52ab03441bb70e89726ddbd1f6e5b683dde05fb65e0720290179e", "32569874A",
                "658945123", true);
        oVeterinarioRepository.save(oVeterinarioEntity1);
        return oVeterinarioRepository.count();
    }

}
