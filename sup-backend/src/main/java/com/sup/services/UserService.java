package com.sup.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import com.sup.models.Cour;
import com.sup.models.Role;
import com.sup.models.User;

public interface UserService {

	public Page<User> getAllUsers(Sort sortBy,int page);

	public User authentification(String id,String login,String password);
	
	public User createAccount(User user);

	public User getUserByEmail(String email);
	
	public User getUserById(String id);
	
	public User addCour(Cour cour);
	
	public User modifyUser(String id,User user);

	public boolean isGetRole(String nom);
	
	public boolean isGetRole(Role role);

	public Cour removeCour(Cour cour);
	
	public User modifyCour(Cour cour);
	
	public boolean deleteUser(String id);
}
