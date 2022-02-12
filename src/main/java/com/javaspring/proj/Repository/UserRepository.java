package com.javaspring.proj.Repository;

import com.javaspring.proj.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String buyer);
    User findByLogin(String login);
}
