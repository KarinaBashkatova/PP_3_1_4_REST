package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.UserDetailServ;

/**
 * @author Karina Bashkarova.
 */

@RestController
@RequestMapping("/user/profile")
public class ProfileRestController {
    private final UserDetailServ userDetailServ;

    @Autowired
    public ProfileRestController(UserDetailServ userDetailServ) {
        this.userDetailServ = userDetailServ;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUser () {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userDetailServ.loadUserByUsername(name).getUser();
        return new ResponseEntity<>(user, HttpStatus.OK);

    }
}
