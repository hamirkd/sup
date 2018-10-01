package com.sup.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sup.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	public User findByLoginAndPassword(String login,String password);
	public User findByLogin(String login);
}
