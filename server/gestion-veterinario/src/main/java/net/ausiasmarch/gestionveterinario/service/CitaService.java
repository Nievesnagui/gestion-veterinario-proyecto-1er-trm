package net.ausiasmarch.gestionveterinario.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.ausiasmarch.gestionveterinario.entity.CitaEntity;
import net.ausiasmarch.gestionveterinario.entity.MascotaEntity;
import net.ausiasmarch.gestionveterinario.exception.ResourceNotFoundException;
import net.ausiasmarch.gestionveterinario.helper.DataGenerationHelper;
import net.ausiasmarch.gestionveterinario.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

@Service
public class CitaService {
    @Autowired
    CitaRepository oCitaRepository;

    @Autowired
    VeterinarioService oVeterinarioService;

    @Autowired
    MascotaService oMascotaService;

    @Autowired
    SessionService oSessionService;

    public CitaEntity get(Long id) {
        return oCitaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cita not found"));
    }

    public CitaEntity create(CitaEntity oCitaEntity) {
        oCitaEntity.setId(null);
        return oCitaRepository.save(oCitaEntity);
    }

    public CitaEntity update(CitaEntity oCitaEntity) {

        CitaEntity oCitaEntityAux = oCitaRepository.findById(oCitaEntity.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cita not found"));
        oCitaEntityAux.setVeterinario(oCitaEntity.getVeterinario());
        oCitaEntityAux.setMascota(oCitaEntity.getMascota());
        oCitaEntityAux.setFecha(oCitaEntity.getFecha());

        // oCitaEntity.setId(null);
        return oCitaRepository.save(oCitaEntityAux);

        // return oCitaRepository.save(oCitaEntity);

    }

    public CitaEntity delete(Long id) {
        CitaEntity oCitaEntityAux = oCitaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita not found"));
        oCitaRepository.deleteById(id);
        return oCitaEntityAux;
    }

    public Page<CitaEntity> getPage(Pageable oPageable, Long id_veterinario, Long id_mascota) {
        if (id_veterinario == null) {
            if (id_mascota == null) {
                return oCitaRepository.findAll(oPageable);
            } else {
                return oCitaRepository.findByMascotaId(id_mascota, oPageable);
            }
        } else {
            return oCitaRepository.findByVeterinarioId(id_veterinario, oPageable);
        }
    }

    public Long populate(Integer amount) {
        for (int i = 0; i < amount; i++) {
            oCitaRepository.save(new CitaEntity(
                    oVeterinarioService.getOneRandom(), oMascotaService.getOneRandom(),
                    DataGenerationHelper.getRadomDate()));
        }
        return oCitaRepository.count();
    }
  @Transactional
    public Long empty() {
        oSessionService.onlyAdmins();
        oCitaRepository.deleteAll();
        CitaEntity oCitaEntity = new CitaEntity(oVeterinarioService.getOneRandom(), oMascotaService.getOneRandom(),
                    DataGenerationHelper.getRadomDate());
        oCitaRepository.save(oCitaEntity);
        oCitaEntity = new CitaEntity(oVeterinarioService.getOneRandom(), oMascotaService.getOneRandom(),
                    DataGenerationHelper.getRadomDate());
        oCitaRepository.save(oCitaEntity);

        return oCitaRepository.count();
    }
}
