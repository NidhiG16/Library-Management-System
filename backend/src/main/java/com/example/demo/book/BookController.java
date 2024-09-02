package com.example.demo.book;

import com.example.demo.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    @PreAuthorize("hasRole('USER")
    public ResponseEntity<List<BookDTO>> getAllBooks(@AuthenticationPrincipal User user) {
        List<BookDTO> books = bookService.getAllBooksForCurrentUser(user);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id, @AuthenticationPrincipal User user) throws BookAccessDeniedException {
        BookDTO book = bookService.getBookByIdForCurrentUser(user, id);
        return ResponseEntity.ok(book);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER")
    public ResponseEntity<Book> createBook(@RequestBody BookDTO bookDTO, @AuthenticationPrincipal User user) {
        bookDTO.setOwner_id(user.getId());
        Book createdBook = bookService.createBookForCurrentUser(user, bookDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO, @AuthenticationPrincipal User user) throws BookAccessDeniedException {
        Book updatedBook = bookService.updateBookForCurrentUser(user, id, bookDTO);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id, @AuthenticationPrincipal User user) throws BookAccessDeniedException {
        bookService.deleteBookForCurrentUser(user, id);
        return ResponseEntity.noContent().build();
    }
}

