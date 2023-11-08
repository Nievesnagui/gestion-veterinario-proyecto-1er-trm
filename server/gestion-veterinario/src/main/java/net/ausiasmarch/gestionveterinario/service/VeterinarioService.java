package net.ausiasmarch.gestionveterinario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

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

    public VeterinarioEntity get(Long id) {
        return oVeterinarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Veterinario not found"));
    }

    public VeterinarioEntity create(VeterinarioEntity oVeterinarioEntity) {
        oVeterinarioEntity.setId(null);
        return oVeterinarioRepository.save(oVeterinarioEntity);
    }

    public VeterinarioEntity update(VeterinarioEntity oVeterinarioEntity) {

        VeterinarioEntity oVeterinarioEntityAux = oVeterinarioRepository.findById(oVeterinarioEntity.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Veterinario not found"));
        oVeterinarioEntityAux.setName(oVeterinarioEntity.getName());
        oVeterinarioEntityAux.setSurname(oVeterinarioEntity.getSurname());
        oVeterinarioEntityAux.setEmail(oVeterinarioEntity.getEmail());
        oVeterinarioEntityAux.setUsername(oVeterinarioEntity.getUsername());
        // oVeterinarioEntityAux.setPassword(oVeterinarioEntity.getPassword());
        oVeterinarioEntityAux.setDni(oVeterinarioEntity.getDni());
        oVeterinarioEntityAux.setPhone(oVeterinarioEntity.getPhone());

        // oVeterinarioEntity.setId(null);
        return oVeterinarioRepository.save(oVeterinarioEntityAux);

        // return oVeterinarioRepository.save(oVeterinarioEntity);

    }

    public VeterinarioEntity delete(Long id) {
        VeterinarioEntity oVeterinarioEntityAux = oVeterinarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Veterinario not found"));
        oVeterinarioRepository.deleteById(id);
        return oVeterinarioEntityAux;
    }

    public Page<VeterinarioEntity> getPage(Pageable oPageable) {
        return oVeterinarioRepository.findAll(oPageable);
    }

    public Long populate(Integer amount) {

        // Aquí él ha puesto lo de generar nombres aleatorios

        /*
         * for (int i = 0; i < amount; i++) {
         * 
         * String password = "unapasswordsegura12345567789976543" + i;
         * oVeterinarioRepository.save(
         * new VeterinarioEntity("Veterinario", "Vete", "correo@mail.com", "veterinario"
         * + i, password,
         * "32323232r", "123456789", 1));
         * }
         * return oVeterinarioRepository.count();
         */
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
                    new VeterinarioEntity(name, surname, email, username , password,
                            "32323232r", "648956235", true));
        }
        return oVeterinarioRepository.count();

    }

}
