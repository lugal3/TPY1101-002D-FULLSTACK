package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name; // Ej: "ROLE_ADMIN", "ROLE_USER"

    @Column(columnDefinition = "TEXT") // Para almacenar un JSON de permisos
    private String permissions; // JSON string, ej: {"canManageUsers": true, "canViewReports": false}

    public Role() {
    }

    public Role(String name, String permissions) {
        this.name = name;
        this.permissions = permissions;
    }

    // Getters y Setters
    public Long getId() {
        return id;
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

    public String getPermissions() {
        return permissions;
    }

    public void setPermissions(String permissions) {
        this.permissions = permissions;
    }
}
