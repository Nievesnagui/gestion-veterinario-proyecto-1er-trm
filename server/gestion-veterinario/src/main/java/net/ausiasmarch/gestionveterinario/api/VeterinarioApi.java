package net.ausiasmarch.gestionveterinario.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
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
import net.ausiasmarch.gestionveterinario.entity.VeterinarioEntity;
import net.ausiasmarch.gestionveterinario.service.VeterinarioService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/veterinario")
public class VeterinarioApi {
    @Autowired
    VeterinarioService oVeterinarioService;

    @GetMapping("/{id}")
    public ResponseEntity<VeterinarioEntity> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(oVeterinarioService.get(id));
    }

    @PostMapping("")
    public ResponseEntity<Long> create(@RequestBody @Valid VeterinarioEntity oVeterinarioEntity) {
        return ResponseEntity.ok(oVeterinarioService.create(oVeterinarioEntity));
    }

    @PutMapping("")
    public ResponseEntity<VeterinarioEntity> update(@RequestBody VeterinarioEntity oVeterinarioEntity) {
        return ResponseEntity.ok(oVeterinarioService.update(oVeterinarioEntity));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(oVeterinarioService.delete(id));
    }

    @GetMapping("")
    public ResponseEntity<Page<VeterinarioEntity>> getPage(
            Pageable oPageable) {
        return ResponseEntity.ok(oVeterinarioService.getPage(oPageable));
    }

    // Endpoint
    @PostMapping("/populate/{amount}")
    public ResponseEntity<Long> populate(@PathVariable("amount") Integer amount) {
        return ResponseEntity.ok(oVeterinarioService.populate(amount));

    }

    @DeleteMapping("/empty")
    public ResponseEntity<Long> empty() {
        return ResponseEntity.ok(oVeterinarioService.empty());
    }

    @GetMapping("/byRepliesNumberDesc")
    public ResponseEntity<Page<VeterinarioEntity>> getPageByRepliesNumberDesc(Pageable oPageable) {
        return ResponseEntity.ok(oVeterinarioService.getPageByRepliesNumberDesc(oPageable));
    }

}
