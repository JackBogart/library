// Array to store book data
const myLibrary = [];

// Library selectors
const library = document.querySelector('.books');
const addBookButton = document.querySelector('.add-book-button');
const deleteBookButton = document.querySelector('.delete-button');

// Dialog selectors
const bookDialog = document.querySelector('dialog');
const submitBook = document.querySelector('.submit-book');
const cancel = document.querySelector('.cancel');

// Form selectors
const bookForm = document.querySelector('.book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

// Form errors
const titleError = document.querySelector('#title + span.error');
const authorError = document.querySelector('#author + span.error');
const pagesError = document.querySelector('#pages + span.error');

class Book {
  #title;
  #author;
  #pages;
  #read;

  constructor(title, author, pages, read) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#read = read;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    this.#title = title;
  }

  get author() {
    return this.#author;
  }

  set author(author) {
    this.#author = author;
  }

  get pages() {
    return this.#pages;
  }

  set pages(pages) {
    this.#pages = pages;
  }

  get read() {
    return this.#read;
  }

  toggleRead() {
    this.#read = !this.#read;
  }
}

function createDeleteButton(bookCard) {
  const deleteButton = document.createElement('button');
  const trashIcon = document.createElement('img');
  trashIcon.src = 'img/trash-icon.svg';
  trashIcon.alt = 'trash button';

  deleteButton.addEventListener('click', () => {
    const bookIndex = Number(bookCard.dataset.index);

    // Update all data-index values for book cards after the removed
    for (let i = bookIndex + 1; i < myLibrary.length; i++) {
      document
        .querySelector(`.book[data-index="${i}"]`)
        .setAttribute('data-index', i - 1);
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
    book.toggleRead();
    setReadToggleColor(book.read, readToggle);
    bookCard.querySelector('.read-status').textContent = book.read
      ? 'read already'
      : 'not read yet';
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
  bookForm.reset();
  title.classList.remove('invalid');
  author.classList.remove('invalid');
  pages.classList.remove('invalid');
  removeError(titleError);
  removeError(authorError);
  removeError(pagesError);

  bookDialog.showModal();
});

bookForm.addEventListener('submit', (e) => {
  let isValidForm = bookForm.checkValidity();
  if (isValidForm) {
    e.preventDefault();
    addBookToLibrary(
      new Book(title.value, author.value, pages.value, read.checked),
    );
    bookDialog.close();
  } else {
    if (!title.validity.valid) {
      setTitleError();
    }
    if (!author.validity.valid) {
      setAuthorError();
    }
    if (!pages.validity.valid) {
      setPagesError();
    }

    e.preventDefault();
  }
});

cancel.addEventListener('click', () => {
  bookDialog.close();
});

cancel.addEventListener('mousedown', (e) => {
  e.preventDefault();
});

submitBook.addEventListener('mousedown', (e) => {
  e.preventDefault();
});

addBookToLibrary(new Book('The Hobbit', 'Tolkien J.R.R.', '295', false));
addBookToLibrary(new Book('Lord of The Rings', 'Tolkien J.R.R.', '428', false));
addBookToLibrary(
  new Book(
    "Harry Potter and the Sorceror's Stone",
    'J.K. Rowling',
    '328',
    true,
  ),
);

function setTitleError() {
  title.classList.add('invalid');
  titleError.classList.add('active');

  if (title.validity.valueMissing) {
    titleError.textContent = 'The title field cannot be empty';
  } else if (title.validity.tooLong) {
    titleError.textContent =
      'The title field cannot be longer than 40 characters';
  } else if (title.validity.tooShort) {
    titleError.textContent =
      'The title field cannot be shorter than 2 characters';
  }
}

title.addEventListener('blur', () => {
  if (!title.validity.valid) {
    title.classList.add('invalid');
    setTitleError();
  }
});

title.addEventListener('input', () => {
  if (title.classList.contains('invalid')) {
    if (!title.validity.valid) {
      setTitleError();
    } else {
      title.classList.remove('invalid');
      removeError(titleError);
    }
  }
});

function setAuthorError() {
  author.classList.add('invalid');
  authorError.classList.add('active');

  if (author.validity.valueMissing) {
    authorError.textContent = 'The author field cannot be empty';
  } else if (author.validity.tooLong) {
    authorError.textContent =
      'The author field cannot be longer than 40 characters';
  }
}

author.addEventListener('blur', () => {
  if (!author.validity.valid) {
    setAuthorError();
  }
});

author.addEventListener('input', () => {
  if (author.classList.contains('invalid')) {
    if (!author.validity.valid) {
      setAuthorError();
    } else {
      author.classList.remove('invalid');
      removeError(authorError);
    }
  }
});

function setPagesError() {
  pages.classList.add('invalid');
  pagesError.classList.add('active');

  if (pages.validity.valueMissing) {
    pagesError.textContent = 'The page # field cannot be empty';
  } else if (pages.validity.badInput) {
    pagesError.textContent = 'The page # field must be a number';
  } else if (pages.validity.rangeUnderFlow) {
    pagesError.textContent = 'Cannot have less than 1 page';
  }
}

pages.addEventListener('blur', () => {
  if (!pages.validity.valid) {
    pages.classList.add('invalid');
    setPagesError();
  }
});

pages.addEventListener('input', () => {
  if (pages.classList.contains('invalid')) {
    if (!pages.validity.valid) {
      setPagesError();
    } else {
      pages.classList.remove('invalid');
      removeError(pagesError);
    }
  }
});

function removeError(element) {
  element.textContent = '';
  element.classList.remove('active');
}
