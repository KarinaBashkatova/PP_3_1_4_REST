package ru.kata.spring.boot_security.demo.configs;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Karina Bashkatova.
 */

@EnableWebSecurity
public class MvcConfigurer implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("admin").setViewName("admin/admin-panel");
        registry.addViewController("admin/profile").setViewName("admin/profile");
        registry.addViewController("admin/new").setViewName("admin/new");
        registry.addViewController("admin/profile").setViewName("admin/profile");
        registry.addViewController("user").setViewName("user/profile-page");
        registry.addViewController("auth/login").setViewName("auth/login");


    }
}
