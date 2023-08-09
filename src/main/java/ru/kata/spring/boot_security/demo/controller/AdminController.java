package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/")
    public String adminHome(Model model){
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);

        return "user";
    }

    @GetMapping("/{id}")
    public String getUser(@PathVariable long id, Model model) {
        User user = userService.getUserById(id);
        model.addAttribute("user", user);

        return "user";
    }

    @GetMapping("/new")
    public String addUser(@ModelAttribute("user") User user, Model model, Principal principal) {
        model.addAttribute("admin", userService.getUserByName(principal.getName()));
        model.addAttribute("role", roleService.getAllRoles());

        return "newUser";
    }

    @PostMapping()
    public String add(@ModelAttribute("user") User user) {
        userService.addUser(user);

        return "redirect:/";
    }

    @PostMapping("/{id}")
    public String updateUser(@PathVariable("id") long id, @ModelAttribute("user") User updateUser){
        User user = userService.getUserById(id);

        if (user == null){
            return "redirect:/";
        }

        userService.updateUser(user);

        return "redirect:/";
    }

    @PostMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.removeUser(id);

        return "redirect:/";
    }
}
