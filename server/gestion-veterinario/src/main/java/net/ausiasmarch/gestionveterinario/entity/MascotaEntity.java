package net.ausiasmarch.gestionveterinario.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "mascota")
public class MascotaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    @Size(min = 3, max = 255)
    private String name;

    @Min(value = 1, message = "El valor debe ser mayor o igual a 1")
    @Max(value = Integer.MAX_VALUE, message = "El valor debe ser menor o igual a " + Integer.MAX_VALUE)
    private Integer chip;

        @NotBlank
    @NotNull
    @Size(min = 3, max = 255)
    private String propietario;


    @NotNull
    @NotBlank
    @Size(min = 8, max = 20)
    @Pattern(regexp = "^[0-9]+$", message = "Phone number must be decimal")
    private String phone;
    @OneToMany(mappedBy = "mascota", fetch = jakarta.persistence.FetchType.LAZY)
    private List<CitaEntity> citas;

    @Email
    private String email;

    public MascotaEntity(@NotBlank @NotNull @Size(min = 3, max = 255) String name,
            @Min(value = 1, message = "El valor debe ser mayor o igual a 1") @Max(value = 2147483647, message = "El valor debe ser menor o igual a 2147483647") Integer chip,
            @NotBlank @NotNull @Size(min = 3, max = 255) String propietario,
            @NotNull @NotBlank @Size(min = 8, max = 20) @Pattern(regexp = "^[0-9]+$", message = "Phone number must be decimal") String phone,
            @Email String email) {
        this.name = name;
        this.chip = chip;
        this.propietario = propietario;
        this.phone = phone;
        this.email = email;
    }

    public MascotaEntity(Long id, @NotBlank @NotNull @Size(min = 3, max = 255) String name,
            @Min(value = 1, message = "El valor debe ser mayor o igual a 1") @Max(value = 2147483647, message = "El valor debe ser menor o igual a 2147483647") Integer chip,
            @NotBlank @NotNull @Size(min = 3, max = 255) String propietario,
            @NotNull @NotBlank @Size(min = 8, max = 20) @Pattern(regexp = "^[0-9]+$", message = "Phone number must be decimal") String phone,
             @Email String email) {
        this.id = id;
        this.name = name;
        this.chip = chip;
        this.propietario = propietario;
        this.phone = phone;
        this.email = email;
    }

    public MascotaEntity() {
        citas = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

 

    public String getPropietario() {
        return propietario;
    }

    public void setPropietario(String propietario) {
        this.propietario = propietario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getChip() {
        return chip;
    }

    public void setChip(Integer chip) {
        this.chip = chip;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getCitas() {
        return citas.size();
    }

}
