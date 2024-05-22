const myLibrary = [];
const library = document.querySelector('.books');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    const readStr = this.read ? 'read already' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages.toString()} pages, ${readStr}`;
};

function addBookToLibrary(book) {
    myLibrary.append(book);
}

function displayBook(book) {
    // Create and assign class for styling
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');

    // Create separate elements of card
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookCard.appendChild(bookAuthor);

    const bookPageCount = document.createElement('p');
    bookPageCount.textContent = `${book.pages} pages`;
    bookCard.appendChild(bookPageCount);

    const bookRead = document.createElement('p');
    bookRead.textContent = book.read ? 'read already' : 'not read yet';
    bookCard.appendChild(bookRead);

    library.appendChild(bookCard);
}

myLibrary.push(new Book('The Hobbit', 'Tolkien J.R.R.', '295', false));
myLibrary.push(new Book('Lord of The Rings', 'Tolkien J.R.R.', '428', false));
myLibrary.push(new Book("Harry Potter and the Sorceror's Stone", 'J.K. Rowling', '328', true));
myLibrary.forEach((book) => displayBook(book));
