package com.sup.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sup.models.Classe;
import com.sup.models.User;
import com.sup.services.ClasseService;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin("*")
public class ClasseController {
	
	@Autowired
    ClasseService classeService;

	@GetMapping("")
    public List<Classe> getAllClasses() {
        return classeService.getClasses();
    }

    @PostMapping("")
    public Classe createClasse(@Valid @RequestBody Classe classe) {
        return classeService.createClasse(classe);
    }
    
	@GetMapping(value = "/{nom}")
	public Classe createClasse(@PathVariable("nom") String nom) {
		return classeService.createClasse(new Classe("",nom));
	}
	@DeleteMapping(value = "/{id}")
	public boolean deleteClasse(@PathVariable("id") String id) {
		return classeService.deleteClasse(id);		
	}
	@PutMapping(value = "/{id}")
	public Classe updateClasse(@PathVariable("id") String id, @Valid @RequestBody Classe classe) {
		return classeService.modifyClasse(id, classe);
	}
}
