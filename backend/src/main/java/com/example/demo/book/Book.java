    package com.example.demo.book;

    import com.example.demo.User.User;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import javax.validation.constraints.NotEmpty;
    import javax.validation.constraints.Min;

    @Entity
    public class Book {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_sequence")
        @SequenceGenerator(
                name = "book_sequence",
                sequenceName = "book_sequence",
                allocationSize = 1
        )
        private Long id;

        @NotEmpty
        private String title;

        @NotEmpty
        private String author;

        @Min(0)
        private int publicationYear;

        private boolean available;
        @JsonIgnore
        @ManyToOne
        @JoinColumn(name = "owner_id")
        private User owner;

        public Book() {
            // Default constructor
        }

        public Book(String title, String author, int publicationYear, boolean available) {
            this.title = title;
            this.author = author;
            this.publicationYear = publicationYear;
            this.available = available;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }

        public int getPublicationYear() {
            return publicationYear;
        }

        public void setPublicationYear(int publicationYear) {
            this.publicationYear = publicationYear;
        }

        public boolean isAvailable() {
            return available;
        }

        public void setAvailable(boolean available) {
            this.available = available;
        }

        public User getOwner() {
            return owner;
        }

        public void setOwner(User owner) {
            this.owner = owner;
        }
    }
