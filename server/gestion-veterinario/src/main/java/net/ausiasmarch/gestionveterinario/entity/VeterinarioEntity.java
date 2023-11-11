package net.ausiasmarch.gestionveterinario.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "veterinario")
public class VeterinarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    @Size(min = 3, max = 255)
    private String name;

    @NotBlank
    @NotNull
    @Size(min = 3, max = 255)
    private String surname;

    @Email
    private String email;

    @NotBlank
    @NotNull
    @Size(min = 6, max = 255)
    private String username;

    private Boolean role =false;

    // Para no poder leer la contraseña
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @NotBlank
    @Size(min = 20, max = 256)
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Password must be decimal")
    private String password = "e2cac5c5f7e52ab03441bb70e89726ddbd1f6e5b683dde05fb65e0720290179e";

    @NotBlank
    @NotNull
    @Size(min = 6, max = 255)
    private String dni;

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public VeterinarioEntity(@NotBlank @NotNull @Size(min = 3, max = 255) String name,
            @NotBlank @NotNull @Size(min = 3, max = 255) String surname, @Email String email,
            @NotBlank @NotNull @Size(min = 6, max = 255) String username,
            @NotNull @NotBlank @Size(min = 20, max = 256) @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Password must be decimal") String password,
            @NotBlank @NotNull @Size(min = 6, max = 255) String dni,
            @NotNull @NotBlank @Size(min = 8, max = 20) @Pattern(regexp = "^[0-9]+$", message = "Phone number must be decimal") String phone,
            Boolean role) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.dni = dni;
        this.phone = phone;
        this.role = role;
    }

    @NotNull
    @NotBlank
    @Size(min = 8, max = 20)
    @Pattern(regexp = "^[0-9]+$", message = "Phone number must be decimal")
    private String phone;
    @OneToMany(mappedBy = "veterinario", fetch = FetchType.EAGER)
    private List<CitaEntity> citas;

    public VeterinarioEntity() {
        citas = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public VeterinarioEntity(@NotBlank @NotNull @Size(min = 3, max = 255) String name,
            @NotNull @NotBlank @Size(min = 20, max = 256) @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Password must be decimal") String password) {
        this.name = name;
        this.password = password;
    }

    public VeterinarioEntity(Long id, @NotBlank @NotNull @Size(min = 3, max = 255) String name,
            @NotBlank @NotNull @Size(min = 3, max = 255) String surname, @Email String email,
            @NotBlank @NotNull @Size(min = 6, max = 255) String username,
            @NotNull @NotBlank @Size(min = 20, max = 256) @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Password must be decimal") String password,
            @NotBlank @NotNull @Size(min = 6, max = 255) String dni,
            @NotNull @NotBlank @Size(min = 8, max = 20) @Pattern(regexp = "^[0-9]+$", message = "Phone number must be decimal") String phone,
            List<CitaEntity> citas) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.dni = dni;
        this.phone = phone;
        this.citas = citas;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean getRole() {
        return role;
    }

    public void setRole(Boolean role) {
        this.role = role;
    }

    public int getCitas() {
        return citas.size();
    }
}
