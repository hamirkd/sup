package com.sup.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sup.models.Classe;

@Repository
public interface ClasseRepository  extends MongoRepository<Classe, String> {
	public Classe findByNom(String nom);
}
