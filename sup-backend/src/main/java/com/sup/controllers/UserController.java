package com.sup.controllers;

import javax.validation.Valid;

import com.sup.models.DataU;
import com.sup.models.User;
import com.sup.services.CourService;
import com.sup.services.RoleService;
import com.sup.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

	@Autowired
	UserService userService;
	@Autowired
	CourService courService;
	@Autowired
	RoleService roleService;

	@GetMapping("")
	public Page<User> getAllUsers() {
		Sort sortBy = new Sort(Sort.Direction.ASC, "createdAt");
		return userService.getAllUsers(sortBy,0);
	}
	@GetMapping("/page/{page}")
	public Page<User> getAllUsers(@PathVariable("page")int page) {
		Sort sortBy = new Sort(Sort.Direction.ASC, "createdAt");
		return userService.getAllUsers(sortBy,page);
	}

	@PostMapping("")
	public User createAccount(@RequestBody DataU dataU) {
		User user=new User(dataU.id,dataU.email,dataU.username, dataU.password)
				.setRole(roleService.findRole(dataU.role));
		
		return userService.createAccount(user);
	}

	@PutMapping(value = "/{id}")
	public User updateUser(@PathVariable("id") String id, @Valid @RequestBody User user) {
		user.setRole(roleService.findRole(user.getRole().getNom()));
		return userService.modifyUser(id, user);
	}

	@PostMapping("/login")
	public User authentification(@Valid @RequestBody DataU user) {
		
		System.out.println(user.email);
		User usero = userService.authentification(user.id, user.email, user.password);
		if (usero != null)
			System.out.println(usero);
		System.out.println(usero);
		
		return usero;
	}
	

	@DeleteMapping(value = "/{id}")
	public boolean deleteUser(@PathVariable("id") String id) {
		return courService.deleteAllCoursOfUser(userService.getUserById(id))&&userService.deleteUser(id);
		
	}

	@GetMapping("/sort/{column}/{order}")
	public Page<User> getAllUsersSort(@PathVariable("column") String column, @PathVariable("order") boolean order) {
		Sort sortBy;
		if (order)
			sortBy = new Sort(Sort.Direction.ASC, column);
		else
			sortBy = new Sort(Sort.Direction.DESC, column);
		return userService.getAllUsers(sortBy,0);
	}
    
}
