package net.ausiasmarch.gestionveterinario.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import net.ausiasmarch.gestionveterinario.entity.CitaEntity;
import net.ausiasmarch.gestionveterinario.entity.MascotaEntity;
import net.ausiasmarch.gestionveterinario.entity.VeterinarioEntity;
import net.ausiasmarch.gestionveterinario.exception.ResourceNotFoundException;
import net.ausiasmarch.gestionveterinario.repository.CitaRepository;
import net.ausiasmarch.gestionveterinario.repository.MascotaRepository;
import net.ausiasmarch.gestionveterinario.repository.VeterinarioRepository;

import java.sql.Time;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

@Service
public class CitaService {
    @Autowired
    CitaRepository oCitaRepository;

    @Autowired
    private VeterinarioRepository oVeterinarioRepository;

    @Autowired
    private MascotaRepository oMascotaRepository;

    public CitaEntity get(Long id) {
        return oCitaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Mascota not found"));
    }

    public CitaEntity create(CitaEntity oCitaEntity) {
        oCitaEntity.setId(null);
        return oCitaRepository.save(oCitaEntity);
    }

    public CitaEntity update(CitaEntity oCitaEntity) {

        CitaEntity oCitaEntityAux = oCitaRepository.findById(oCitaEntity.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Mascota not found"));
        oCitaEntityAux.setVeterinario(oCitaEntity.getVeterinario());
        oCitaEntityAux.setMascota(oCitaEntity.getMascota());
        oCitaEntityAux.setFecha(oCitaEntity.getFecha());
        oCitaEntityAux.setHora(oCitaEntity.getHora());

        // oCitaEntity.setId(null);
        return oCitaRepository.save(oCitaEntityAux);

        // return oCitaRepository.save(oCitaEntity);

    }

    public CitaEntity delete(Long id) {
        CitaEntity oCitaEntityAux = oCitaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mascota not found"));
        oCitaRepository.deleteById(id);
        return oCitaEntityAux;
    }

    public Page<CitaEntity> getPage(Pageable oPageable, Long id_veterinario) {
        return oCitaRepository.findByVeterinarioId(id_veterinario, oPageable);
    }

    public Long populate(Integer amount) {
        Long id = 1L;
        VeterinarioEntity veterinario = oVeterinarioRepository.findById(id).orElse(null);
        MascotaEntity mascota = oMascotaRepository.findById(id).orElse(null);
        // Crear una fecha actual y hora actual como valores predeterminados
        Date fecha = new Date(); // Esto crea la fecha actual
        Time hora = new Time(System.currentTimeMillis()); // Esto crea la hora actual

        for (int i = 0; i < amount; i++) {
            oCitaRepository.save(new CitaEntity(veterinario, mascota, fecha, hora));
        }
        return oCitaRepository.count();
    }
}
