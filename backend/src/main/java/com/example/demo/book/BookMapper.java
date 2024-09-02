package com.example.demo.book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface BookMapper {

    BookDTO bookToBookDTO(Book book);

    Book bookDTOToBook(BookDTO bookDTO);

    @Mapping(target = "id", ignore = true)
    void updateBookFromDTO(BookDTO bookDTO, @MappingTarget Book existingBook);
}
