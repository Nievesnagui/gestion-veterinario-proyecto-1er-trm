package net.ausiasmarch.gestionveterinario.api;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import net.ausiasmarch.gestionveterinario.entity.CitaEntity;
import net.ausiasmarch.gestionveterinario.service.CitaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/cita")
public class CitaApi {
     @Autowired
    CitaService oCitaService;


    @GetMapping("/{id}")
    public ResponseEntity<CitaEntity> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(oCitaService.get(id));
    }

    @PostMapping("")
    public ResponseEntity<CitaEntity> create(@RequestBody @Valid CitaEntity oCitarioEntity) {
        return ResponseEntity.ok(oCitaService.create(oCitarioEntity));
    }

    @PutMapping("")
    public ResponseEntity<CitaEntity> update(@RequestBody CitaEntity oCitarioEntity) {
        return ResponseEntity.ok(oCitaService.update(oCitarioEntity));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CitaEntity> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(oCitaService.delete(id));

    }

     @GetMapping("")
    public ResponseEntity<Page<CitaEntity>> getPage(
            Pageable oPageable,
            @RequestParam(value = "id_user", defaultValue = "", required = false) Long id_veterinario) {
        return ResponseEntity.ok(oCitaService.getPage(oPageable, id_veterinario));
    }
    // Endpoint
    @PostMapping("/populate/{amount}")
    public ResponseEntity<Long> populate(@PathVariable("amount") Integer amount) {
        return ResponseEntity.ok(oCitaService.populate(amount));

    }
}
