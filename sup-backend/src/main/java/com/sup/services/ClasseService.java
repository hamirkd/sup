package com.sup.services;

import java.util.List;

import com.sup.models.Classe;

public interface ClasseService {

	public List<Classe>getClasses();
	
	public List<Classe>getClasses(List<Classe> classes);
	
	public Classe createClasse(Classe classe);

	public boolean deleteClasse(String id);
	
	public Classe modifyClasse(String id,Classe classe);
	
	public Classe findClasse(String nom);
	
}
