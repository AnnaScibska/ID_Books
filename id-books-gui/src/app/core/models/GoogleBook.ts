export class GoogleBook {
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      identifier: string;
    };
    imageLinks: {
      thumbnail: string;
    }
  };
}
