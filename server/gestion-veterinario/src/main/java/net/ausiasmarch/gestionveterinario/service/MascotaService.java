package net.ausiasmarch.gestionveterinario.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletRequest;
import net.ausiasmarch.gestionveterinario.entity.MascotaEntity;
import net.ausiasmarch.gestionveterinario.exception.ResourceNotFoundException;
import net.ausiasmarch.gestionveterinario.helper.DataGenerationHelper;
import net.ausiasmarch.gestionveterinario.repository.MascotaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class MascotaService {
    @Autowired
    MascotaRepository oMascotaRepository;

    @Autowired
    HttpServletRequest oHttpServletRequest;

    @Autowired
    SessionService oSessionService;

    public MascotaEntity get(Long id) {
        return oMascotaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Mascota not found"));
    }

    public MascotaEntity create(MascotaEntity oMascotaEntity) {
        oMascotaEntity.setId(null);
        return oMascotaRepository.save(oMascotaEntity);
    }

    public MascotaEntity getOneRandom() {
        oSessionService.onlyAdmins();
        Pageable oPageable = PageRequest.of((int) (Math.random() * oMascotaRepository.count()), 1);
        return oMascotaRepository.findAll(oPageable).getContent().get(0);
    }

    public MascotaEntity update(MascotaEntity oMascotaEntity) {

        MascotaEntity oMascotaEntityAux = oMascotaRepository.findById(oMascotaEntity.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Mascota not found"));
        oMascotaEntityAux.setName(oMascotaEntity.getName());
        oMascotaEntityAux.setChip(oMascotaEntity.getChip());
        oMascotaEntityAux.setPropietario(oMascotaEntity.getPropietario());
        oMascotaEntityAux.setPhone(oMascotaEntity.getPhone());
        oMascotaEntityAux.setEmail(oMascotaEntity.getEmail());

        // oMascotaEntity.setId(null);
        return oMascotaRepository.save(oMascotaEntityAux);

        // return oMascotaRepository.save(oMascotaEntity);

    }

    public MascotaEntity delete(Long id) {
        MascotaEntity oMascotaEntityAux = oMascotaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mascota not found"));
        oMascotaRepository.deleteById(id);
        return oMascotaEntityAux;
    }

    public Page<MascotaEntity> getPage(Pageable oPageable) {
        return oMascotaRepository.findAll(oPageable);
    }
/*
    public Page<MascotaEntity> getPageByRepliesNumberDesc(Pageable oPageable) {
        return oMascotaRepository.findPetsByRepliesNumberDescFilter(oPageable);
    } */
    public Long populate(Integer amount) {
        for (int i = 0; i < amount; i++) {

            String name = DataGenerationHelper.getRadomMascota();
            String propietario = DataGenerationHelper.getRadomName() + " " + DataGenerationHelper.getRadomSurname();
            String phone = "625413285";
            String email = name.substring(0, 3) + propietario.substring(0, 3) + i
                    + "@ausiasmarch.net";
            oMascotaRepository.save(
                    new MascotaEntity(name, 1234568, propietario, phone, email));
        }
        return oMascotaRepository.count();
    }

    @Transactional
    public Long empty() {
        oSessionService.onlyAdmins();
        oMascotaRepository.deleteAll();
        MascotaEntity oMascotaEntity = new MascotaEntity("Bollito", 12345678, "Pepe", "647512369", "mail@correo.es");
        oMascotaRepository.save(oMascotaEntity);
        oMascotaEntity = new MascotaEntity("Micho", 12345678, "Juan", "647512369", "mail@correo.es");
        oMascotaRepository.save(oMascotaEntity);

        return oMascotaRepository.count();
    }
}
