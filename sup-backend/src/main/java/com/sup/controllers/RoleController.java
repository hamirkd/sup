package com.sup.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sup.models.Role;
import com.sup.services.RoleService;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin("*")
public class RoleController {
	
	@Autowired
    RoleService roleService;

	@GetMapping("")
    public List<Role> getAllRoles() {
        return roleService.getRoles();
    }

    @PostMapping("")
    public Role createRole(@Valid @RequestBody Role role) {
        return roleService.createRole(role);
    }
    
	@GetMapping(value = "/{nom}")
	public Role createRole(@PathVariable("nom") String nom) {
		return roleService.createRole(nom);
	}
}
