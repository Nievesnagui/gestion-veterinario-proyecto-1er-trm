package net.ausiasmarch.gestionveterinario.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import net.ausiasmarch.gestionveterinario.entity.MascotaEntity;
import net.ausiasmarch.gestionveterinario.exception.ResourceNotFoundException;
import net.ausiasmarch.gestionveterinario.repository.MascotaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

@Service
public class MascotaService {
    @Autowired
    MascotaRepository oMascotaRepository;

    public MascotaEntity get(Long id) {
        return oMascotaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Mascota not found"));
    }

    public MascotaEntity create(MascotaEntity oMascotaEntity) {
        oMascotaEntity.setId(null);
        return oMascotaRepository.save(oMascotaEntity);
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

    public Long populate(Integer amount) {
        for (int i = 0; i < amount; i++) {
            String phone="123465789";
            oMascotaRepository.save(
                    new MascotaEntity("name" + i, 1234568, "propietario " + i, phone, "mail@mail.com"));
        }
        return oMascotaRepository.count();
    }
}
