package net.ausiasmarch.gestionveterinario.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "cita")
public class CitaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_veterinario")
    private VeterinarioEntity veterinario;

    @ManyToOne
    @JoinColumn(name = "id_mascota")
    private MascotaEntity mascota;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime fecha;

    public CitaEntity(Long id, VeterinarioEntity veterinario, MascotaEntity mascota, @NotNull LocalDateTime fecha) {
        this.id = id;
        this.veterinario = veterinario;
        this.mascota = mascota;
        this.fecha = fecha;
    }

    public CitaEntity(VeterinarioEntity veterinario, MascotaEntity mascota, @NotNull LocalDateTime fecha) {
        this.veterinario = veterinario;
        this.mascota = mascota;
        this.fecha = fecha;
    }

    public CitaEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VeterinarioEntity getVeterinario() {
        return veterinario;
    }

    public void setVeterinario(VeterinarioEntity veterinario) {
        this.veterinario = veterinario;
    }

    public MascotaEntity getMascota() {
        return mascota;
    }

    public void setMascota(MascotaEntity mascota) {
        this.mascota = mascota;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

}
