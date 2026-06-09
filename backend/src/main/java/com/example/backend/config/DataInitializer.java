package com.example.backend.config;

import com.example.backend.model.Role;
import com.example.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Crear rol de Administrador si no existe
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            String adminPermissions = "{\"canManageUsers\": true, \"canDeleteContent\": true}";
            Role adminRole = new Role("ROLE_ADMIN", adminPermissions);
            roleRepository.save(adminRole);
        }

        // Crear rol de Usuario si no existe
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            String userPermissions = "{\"canManageUsers\": false, \"canDeleteContent\": false}";
            Role userRole = new Role("ROLE_USER", userPermissions);
            roleRepository.save(userRole);
        }
    }
}
