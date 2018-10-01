package com.sup.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sup.models.Role;

@Repository
public interface RoleRepository  extends MongoRepository<Role, String> {
	public Role findRoleByNom(String nom);
}
