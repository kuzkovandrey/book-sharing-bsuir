export interface CreateBookDto {
  title: string;
  description: string;
  pageCount: number;
  publicationYear: number;
  language: string;
  genre: string;
  publisher: string;
  pictures: string[];
  authors: {
    firstName: string;
    lastName: string;
  }[];
}
