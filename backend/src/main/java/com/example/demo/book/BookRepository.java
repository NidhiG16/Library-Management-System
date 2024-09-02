package com.example.demo.book;


import com.example.demo.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByOwnerEmail(String email);

    List<Book> findByOwner(User currentUser);
}