// Array to store book data
const myLibrary = [];

// Library selectors
const library = document.querySelector('.books');
const addBookButton = document.querySelector('.add-book-button');
const deleteBookButton = document.querySelector('.delete-button');

// Dialog selectors
const bookDialog = document.querySelector('dialog');
const submitBook = document.querySelector('.submit-book');

// Form selectors
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

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function createDeleteButton(bookCard) {
    const deleteButton = document.createElement('button');
    const trashIcon = document.createElement('img');
    trashIcon.src = 'img/trash-icon.svg';
    trashIcon.alt = 'trash button';

    deleteButton.addEventListener('click', () => {
        const bookIndex = Number(bookCard.dataset.index);

        // Update all data-index values for book cards after the removed
        for (let i = bookIndex + 1; i < myLibrary.length; i++) {
            document.querySelector(`.book[data-index="${i}"]`).setAttribute('data-index', i - 1);
        }

        library.removeChild(bookCard);
        myLibrary.splice(bookIndex, 1);
    });

    deleteButton.appendChild(trashIcon);
    deleteButton.classList.add('delete-button', 'book-button');
    return deleteButton;
}

function setReadToggleColor(read, readToggle) {
    if (read) {
        readToggle.setAttribute('data-status', 'read');
    } else {
        readToggle.setAttribute('data-status', 'not read');
    }
}

function createReadToggle(book, bookCard) {
    const readToggle = document.createElement('button');
    const bookIcon = document.createElement('img');
    bookIcon.src = 'img/book-icon.svg';
    bookIcon.alt = 'read toggle';

    setReadToggleColor(book.read, readToggle);

    readToggle.addEventListener('click', () => {
        book.read = !book.read;
        setReadToggleColor(book.read, readToggle);
        bookCard.querySelector('.read-status').textContent = book.read ? 'read already' : 'not read yet';
    });

    readToggle.appendChild(bookIcon);
    readToggle.classList.add('read-toggle', 'book-button');
    return readToggle;
}

function addBookToLibrary(book) {
    displayBook(book);
    myLibrary.push(book);
}

function displayBook(book) {
    // Create and assign class for styling
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.dataset.index = myLibrary.length;

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
    bookRead.classList.add('read-status');
    bookCard.appendChild(bookRead);

    bookCard.appendChild(createDeleteButton(bookCard));
    bookCard.appendChild(createReadToggle(book, bookCard));

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

addBookToLibrary(new Book('The Hobbit', 'Tolkien J.R.R.', '295', false));
addBookToLibrary(new Book('Lord of The Rings', 'Tolkien J.R.R.', '428', false));
addBookToLibrary(new Book("Harry Potter and the Sorceror's Stone", 'J.K. Rowling', '328', true));
