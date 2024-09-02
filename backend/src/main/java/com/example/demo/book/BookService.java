package com.example.demo.book;

import com.example.demo.User.User;
import com.example.demo.User.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final UserRepository userRepository;

    public BookService(BookRepository bookRepository, BookMapper bookMapper, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<BookDTO> getAllBooksForCurrentUser(User user) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Book> books = bookRepository.findByOwner(currentUser);

        return books.stream()
                .map(bookMapper::bookToBookDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookDTO getBookByIdForCurrentUser(User user, Long id) throws BookAccessDeniedException {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalAccessError("Book with ID " + id + " not found"));

        if (!book.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalAccessError("You do not have access to this book.");
        }

        return bookMapper.bookToBookDTO(book);
    }

    @Transactional
    public Book createBookForCurrentUser(User user, BookDTO bookDTO) {
        Book book = bookMapper.bookDTOToBook(bookDTO);
        User owner = (User) userRepository.findById(bookDTO.getOwner_id())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        book.setOwner(owner);

        return bookRepository.save(book);
    }


    @Transactional
    public Book updateBookForCurrentUser(User user, Long id, BookDTO bookDTO) throws BookAccessDeniedException {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalAccessError("Book with ID " + id + " not found"));


        if (!existingBook.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalAccessError("You do not have access to update this book.");
        }

        bookMapper.updateBookFromDTO(bookDTO, existingBook);
        return bookRepository.save(existingBook);
    }

    @Transactional
    public void deleteBookForCurrentUser(User user, Long id) throws BookAccessDeniedException {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalAccessError("Book with ID " + id + " not found"));


        if (!book.getOwner().getId().equals(currentUser.getId())) {
            throw new IllegalAccessError("You do not have access to delete this book.");
        }

        bookRepository.deleteById(id);
    }


}
