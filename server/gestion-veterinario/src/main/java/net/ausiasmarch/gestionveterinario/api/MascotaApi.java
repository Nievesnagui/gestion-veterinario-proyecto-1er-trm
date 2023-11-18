package net.ausiasmarch.gestionveterinario.api;


import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import net.ausiasmarch.gestionveterinario.entity.MascotaEntity;
import net.ausiasmarch.gestionveterinario.service.MascotaService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/mascota")
public class MascotaApi {
     @Autowired
    MascotaService oMascotaService;


    @GetMapping("/{id}")
    public ResponseEntity<MascotaEntity> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(oMascotaService.get(id));
    }

    @PostMapping("")
    public ResponseEntity<MascotaEntity> create(@RequestBody @Valid MascotaEntity oMascotaEntity) {
        return ResponseEntity.ok(oMascotaService.create(oMascotaEntity));
    }
    @DeleteMapping("/empty")
    public ResponseEntity<Long> empty() {
        return ResponseEntity.ok(oMascotaService.empty());
    }
    @PutMapping("")
    public ResponseEntity<MascotaEntity> update(@RequestBody MascotaEntity oMascotaEntity) {
        return ResponseEntity.ok(oMascotaService.update(oMascotaEntity));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MascotaEntity> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(oMascotaService.delete(id));

    }

     @GetMapping("")
     public ResponseEntity<Page<MascotaEntity>> getPage(
            Pageable oPageable) {
        return ResponseEntity.ok(oMascotaService.getPage(oPageable));
    }

    // Endpoint
    @PostMapping("/populate/{amount}")
    public ResponseEntity<Long> populate(@PathVariable("amount") Integer amount) {
        return ResponseEntity.ok(oMascotaService.populate(amount));

    }
}
