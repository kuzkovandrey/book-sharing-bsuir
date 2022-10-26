import { BookModel } from '@book-sharing/api-interfaces';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss'],
})
export class BookDescriptionComponent {
  @Input() book: BookModel;

  get bookAuthors(): string[] {
    return this.book.authors.map(
      ({ firstName, lastName }) => `${firstName} ${lastName};`
    );
  }
}
