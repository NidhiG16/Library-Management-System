package com.example.demo.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    void deleteById(Long id);

    Optional<Object> findById(Long ownerId);

    boolean existsByEmail(String email);

    Optional<Object> findByPassword(String encode);


    boolean existsByPassword(String password);
}

