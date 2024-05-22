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
