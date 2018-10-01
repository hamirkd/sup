package com.sup.services;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.sup.models.Cour;
import com.sup.models.User;

public interface CourService {

	public List<Cour> listeDeTousLesCoursPublic();

	public List<Cour> listCoursPublicSort(Sort sortBy);

	public Cour creerCour(Cour cour);

	public Cour modifierCour(String id, Cour cour);

	public Cour supprimerCour(String id);

	public boolean deleteAllCoursOfUser(User user);

	public Cour rechercherCourId(String id);
	
	public List<Cour> findCours(String titre);
	//public List<Cour> listeDeSesCours(String userId);
}
