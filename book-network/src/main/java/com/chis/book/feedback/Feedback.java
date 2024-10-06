package com.chis.book.feedback;

import com.chis.book.book.Book;
import com.chis.book.common.BaseEntity;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Feedback extends BaseEntity {

    private Double note; // 1-5 stars
    private String comment;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

}
