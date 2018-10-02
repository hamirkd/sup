package com.sup.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sup.models.Classe;
import com.sup.models.User;
import com.sup.repositories.ClasseRepository;

@Service
@Transactional
public class ClasseServiceImpl implements ClasseService {

	@Autowired
	ClasseRepository classeRepository;

	@Override
	public List<Classe> getClasses() {
		return classeRepository.findAll();
	}

	@Override
	public List<Classe> getClasses(List<Classe> classes) {
		List<Classe> classesData = new ArrayList<>();
		for (Classe classe : classeRepository.findAll())
			for (Classe classeArg : classes)
				if (classeArg.getNom().compareTo(classe.getNom()) == 0)
					classesData.add(classe);
		return classesData;
	}

	@Override
	public Classe createClasse(Classe Classe) {
		return classeRepository.save(Classe);
	}

	/**
	 * @since: Si le Classe n'existe pas, il ajoute ou provoque une erreure
	 */
	@Override
	public Classe findClasse(String nom) {
		Classe classe = classeRepository.findByNom(nom);
		if (classe != null)
			return classe;
		return createClasse(new Classe("", nom));
	}

	@Override
	public boolean deleteClasse(String id) {
		// TODO Auto-generated method stub
		classeRepository.deleteById(id);
		return true;
	}
	@Override
	public Classe modifyClasse(String id, Classe classe) {
		return classeRepository.findById(id)
            .map(classeData -> {
            	classeData.setNom(classe.getNom());
                Classe updatedUser = classeRepository.save(classeData);
                return ResponseEntity.ok().body(classeData);
            }).orElse(ResponseEntity.notFound().build()).getBody();
	}
}
