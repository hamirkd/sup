package com.sup.models;

import java.util.Date;


public class RoleTemp {
	private String id;
	private String nom;
	private Date debut;
	private Date fin;
	private Date createdAt;
	public RoleTemp(String id,String nom,Date debut,Date fin) {
		this.id=id;
		this.nom=nom;
		this.debut=debut;
		this.fin=fin;
		this.createdAt=new Date();
	}
	public String getId() {
		return id;
	}
	public String getNom() {
		return nom;
	}
	public Date getDebut() {
		return debut;
	}
	public Date getFin() {
		return fin;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
}
