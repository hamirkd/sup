package com.sup.controllers;

import javax.validation.Valid;

import com.sup.models.Cour;
import com.sup.models.User;
import com.sup.services.CourService;
import com.sup.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cours")
@CrossOrigin("*")
public class CourController {

	@Autowired
	CourService courService;

	@Autowired
	UserService userService;

	@GetMapping("")
	public List<Cour> getAllCours() {
		return courService.listeDeTousLesCoursPublic();
	}
	
	  @GetMapping("/users/{user}")
	  public List<Cour> getMyCours(@PathVariable("user") User user) { 
		  return  courService.listMyCoursSort(user,null); 
	  }
	
	  @GetMapping("/users/suivi/{user}")
	  public List<Cour> getMyCoursSuivi(@PathVariable("user") User user) { 
		  return  courService.listMyCoursSuiviSort(user,null); 
	  }
	 

	@PostMapping("")
	public Cour createCour(@Valid @RequestBody Cour cour) {
		//cour.getUser().setCours(null);
		return courService.createCour(cour);
	}

	@GetMapping(value = "/{id}")
	public Cour getCourById(@PathVariable("id") Cour cour) {
		return cour;
	}

	@PutMapping(value = "/{id}")
	public Cour updateCour(@PathVariable("id") String id, @Valid @RequestBody Cour cour) {
		return courService.modifierCour(id, cour);
	}

	@DeleteMapping(value = "/{id}")
	public Object deleteCour(@PathVariable("id") String id) {
		return userService.removeCour(courService.supprimerCour(id));
	}

	@GetMapping(value = "/titre/{titre}")
	public List<Cour> getCourByTitre(@PathVariable("titre") String titre) {
		return courService.findCours(titre);
	}

	@GetMapping("/sort/{column}/{order}")
	public List<Cour> getAllCoursSort(@PathVariable("column") String column, @PathVariable("order") boolean order) {
		Sort sortBy;
		if (order)
			sortBy = new Sort(Sort.Direction.ASC, column);
		else
			sortBy = new Sort(Sort.Direction.DESC, column);
		return courService.listCoursPublicSort(sortBy);
	}
}