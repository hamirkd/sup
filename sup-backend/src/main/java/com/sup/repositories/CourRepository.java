package com.sup.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sup.models.Cour;
import com.sup.models.User;

@Repository
public interface CourRepository extends MongoRepository<Cour, String> {
	public List<Cour> findByTitre(String titre);
	//public List<Cour> findByUserid(String userid);
	public List<Cour> findByVisibilite(Boolean visibilite);
	public List<Cour> findByVisibiliteIsTrue();
	public List<Cour> findByVisibiliteIsTrue(Sort sort);
	public List<Cour> findByUser(User user,Sort sort);
	public List<Cour> findByUsersSuiviId(String id,Sort sort);
	public List<Cour> findByUser(User user);
}
