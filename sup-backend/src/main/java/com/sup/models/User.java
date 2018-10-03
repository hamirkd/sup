package com.sup.models;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Document(collection = "users")
@JsonIgnoreProperties(value = { "createdAt" }, allowGetters = true)
public class User {
	@Id
	private String id;

	@NotBlank
	@Size(max = 100)
	@Indexed(unique = true)
	private String email;
	
	private String username;

	private String password;

	private Date createdAt;
	
	@DBRef
	@Field("role")
	private Role role;


	public User(String id, String email,String username, String password) {
		this.id = id;
		this.email = email;
		this.username=username;
		this.password = password;
		createdAt = new Date();
	}

	public String getId() {
		return id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public String getEmail() {
		return email;
	}
	public String getUsername() {
		return this.username;
	}
	
	public void setPassword(String password) {
		this.password=password;
	}
	
	public void setUser(User user) {
		this.id=user.id;
		if(user.email!=null)
		this.email=user.email;
		if(user.password!=null)
		this.password=user.password;
		if(user.role!=null)
		this.role=user.role;
	}
	public Role getRole() {
		return role;
	}
	
	public User setRole(Role role) {
		this.role=role;
		return this;
	}
	@Override
	public String toString() {
		return String.format("User[login:%s]", email);
	}
}
