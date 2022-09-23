package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserDetailServ;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

/**
 * @author Karina Bashkatova.
 */
@org.springframework.web.bind.annotation.RestController
@CrossOrigin
@RequestMapping(value = "/admin/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class RestController {

    private final UserService userService;

    private final UserDetailServ userDetailServ;

    private final RoleService roleService;

    @Autowired
    public RestController(UserService userService, UserDetailServ userDetailServ, RoleService roleService) {
        this.userService = userService;
        this.userDetailServ = userDetailServ;
        this.roleService = roleService;
    }

    @GetMapping()
    public ResponseEntity<List<User>>  allUsers() {

        return ResponseEntity.ok(userService.showAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable int id) {   //PathVariable используем для получение параметра из адреса запроса
        try {
            User user = userService.showUser(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/admin/users/current")
//    public ResponseEntity<?> getUser() {
//        String name = SecurityContextHolder.getContext().getAuthentication().getName();
//        User currentUser = userDetailServ.loadUserByUsername(name).getUser();
//            return new ResponseEntity<>(currentUser, HttpStatus.OK);
//    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public User addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        User newUser = userService.showUser(user.getId());
        return newUser;
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public User updateUser(@RequestBody User user, @PathVariable("id") int id) {
        userService.update(id, user);
        return user;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable int id) {
        userService.delete(id);
    }

    @GetMapping("/by")
    public User getByUsername(@RequestParam String username) {
        return userDetailServ.loadUserByUsername(username).getUser();
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(roleService.getRoleList(), HttpStatus.OK);
    }





}