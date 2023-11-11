package net.ausiasmarch.gestionveterinario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import net.ausiasmarch.gestionveterinario.bean.VeterinarioBean;
import net.ausiasmarch.gestionveterinario.entity.VeterinarioEntity;
import net.ausiasmarch.gestionveterinario.exception.ResourceNotFoundException;
import net.ausiasmarch.gestionveterinario.exception.UnauthorizedException;
import net.ausiasmarch.gestionveterinario.helper.JWTHelper;
import net.ausiasmarch.gestionveterinario.repository.VeterinarioRepository;
@Service
public class SessionService {

    @Autowired
    VeterinarioRepository oVeterinarioRepository;

    @Autowired
    HttpServletRequest oHttpServletRequest;

    public String login(VeterinarioBean oVeterinarioBean) {
        oVeterinarioRepository.findByUsernameAndPassword(oVeterinarioBean.getUsername(), oVeterinarioBean.getPassword())
                .orElseThrow(() -> new ResourceNotFoundException("Wrong User or password"));
        return JWTHelper.generateJWT(oVeterinarioBean.getUsername());
    }

    public String getSessionUsername() {        
        if (oHttpServletRequest.getAttribute("username") instanceof String) {
            return oHttpServletRequest.getAttribute("username").toString();
        } else {
            return null;
        }
    }

    public VeterinarioEntity getSessionUser() {
        if (this.getSessionUsername() != null) {
            return oVeterinarioRepository.findByUsername(this.getSessionUsername()).orElse(null);    
        } else {
            return null;
        }
    }

    public Boolean isSessionActive() {
        if (this.getSessionUsername() != null) {
            return oVeterinarioRepository.findByUsername(this.getSessionUsername()).isPresent();
        } else {
            return false;
        }
    }

    public Boolean isAdmin() {
        if (this.getSessionUsername() != null) {
            VeterinarioEntity oVeterinarioEntityInSession = oVeterinarioRepository.findByUsername(this.getSessionUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            return Boolean.FALSE.equals(oVeterinarioEntityInSession.getRole());
        } else {
            return false;
        }
    }

    public Boolean isUser() {
        if (this.getSessionUsername() != null) {
            VeterinarioEntity oVeterinarioEntityInSession = oVeterinarioRepository.findByUsername(this.getSessionUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            return Boolean.TRUE.equals(oVeterinarioEntityInSession.getRole());
        } else {
            return false;
        }
    }

    public void onlyAdmins() {
        if (!this.isAdmin()) {
            throw new UnauthorizedException("Only admins can do this");
        }
    }

    public void onlyUsers() {
        if (!this.isUser()) {
            throw new UnauthorizedException("Only users can do this");
        }
    }

    public void onlyAdminsOrUsers() {
        if (!this.isSessionActive()) {
            throw new UnauthorizedException("Only admins or users can do this");
        }
    }

    public void onlyUsersWithIisOwnData(Long id_user) {
        if (!this.isUser()) {
            throw new UnauthorizedException("Only users can do this");
        }
        if (!this.getSessionUser().getId().equals(id_user)) {
            throw new UnauthorizedException("Only users can do this");
        }
    }

    public void onlyAdminsOrUsersWithIisOwnData(Long id_user) {
        if (this.isSessionActive()) {
            if (!this.isAdmin()) {
                if (!this.isUser()) {
                    throw new UnauthorizedException("Only admins or users can do this");
                } else {
                    if (!this.getSessionUser().getId().equals(id_user)) {
                        throw new UnauthorizedException("Only admins or users with its own data can do this");
                    }
                }
            }
        } else {
            throw new UnauthorizedException("Only admins or users can do this");
        }
    }

}
