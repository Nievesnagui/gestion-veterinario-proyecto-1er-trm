package net.ausiasmarch.gestionveterinario.entity;

import java.sql.Time;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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

    @Temporal(TemporalType.DATE) // Tipo de dato de fecha
    @NotNull
    private Date fecha;

    @Temporal(TemporalType.TIME) // Tipo de dato de hora
    @NotNull
    private Time hora;

    

    public CitaEntity(Long id, VeterinarioEntity veterinario, MascotaEntity mascota, @NotNull Date fecha,
            @NotNull Time hora) {
        this.id = id;
        this.veterinario = veterinario;
        this.mascota = mascota;
        this.fecha = fecha;
        this.hora = hora;
    }



    public CitaEntity(VeterinarioEntity veterinario, MascotaEntity mascota, @NotNull Date fecha, @NotNull Time hora) {
        this.veterinario = veterinario;
        this.mascota = mascota;
        this.fecha = fecha;
        this.hora = hora;
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

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Time getHora() {
        return hora;
    }

    public void setHora(Time hora) {
        this.hora = hora;
    }

}
