package com.sup.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sup.models.Role;
import com.sup.repositories.RoleRepository;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@Autowired
	RoleRepository roleRepository;

	@Override
	public List<Role> getRoles() {
		return roleRepository.findAll();
	}

	@Override
	public Set<Role> getRoles(Set<String> roles) {
		Set<Role> rolesData = new HashSet<>();
		for (Role role : roleRepository.findAll())
			for (String roleString : roles)
				if (roleString.compareTo(role.getNom()) == 0)
					rolesData.add(role);

		return rolesData;
	}

	@Override
	public Role createRole(String nom) {
		return roleRepository.save(new Role(null,nom));
	}

	@Override
	public Role createRole(Role role) {
		return roleRepository.save(role);
	}

	/**
	 * @since: Si le role n'existe pas, il ajoute ou provoque une erreure
	 */
	@Override
	public Role findRole(String nom) {
		Role role= roleRepository.findByNom(nom);
		System.out.println(" Le role de l'utilisateur est :  "+role);
		if(role==null)
			return role; 
		System.out.println(" Impossible il n'existe pas ");
		return createRole(nom);
	}

}
