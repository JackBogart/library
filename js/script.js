const myLibrary = [];

const library = document.querySelector('.books');
const addBookButton = document.querySelector('.add-book-button');

const bookDialog = document.querySelector('dialog');
const submitBook = document.querySelector('.submit-book');

const bookForm = document.querySelector('.book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

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
    myLibrary.push(book);
    displayBook(book);
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

    library.insertBefore(bookCard, addBookButton);
}

addBookButton.addEventListener('click', () => {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;

    bookDialog.showModal();
});

submitBook.addEventListener('click', (e) => {
    let isValidForm = bookForm.checkValidity();
    if (!isValidForm) {
        bookForm.reportValidity();
    } else {
        e.preventDefault();
        addBookToLibrary(new Book(title.value, author.value, pages.value, read.checked));
        bookDialog.close();
    }
});

myLibrary.push(new Book('The Hobbit', 'Tolkien J.R.R.', '295', false));
myLibrary.push(new Book('Lord of The Rings', 'Tolkien J.R.R.', '428', false));
myLibrary.push(new Book("Harry Potter and the Sorceror's Stone", 'J.K. Rowling', '328', true));
myLibrary.forEach((book) => displayBook(book));
