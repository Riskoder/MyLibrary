const myLibrary = [];

const container = document.querySelector('.container');
const bookCardTemplate = document.getElementById('book-card-template').content;
const addBookCard = document.getElementById('add-book-button');

const dialogWrapper = document.querySelector('.dialog-wrapper');
const bookDialog = document.querySelector('#book-dialog');

const showBookDialog = (show) =>
  show ? bookDialog.showModal() : bookDialog.close();

bookDialog.addEventListener(
  'click',
  (e) => !dialogWrapper.contains(e.target) && bookDialog.close()
);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? 'Read' : 'Not Read';
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function renderMyLibrary() {
  container.textContent = '';
  myLibrary.forEach((book, index) => {
    const newBookCard = bookCardTemplate.cloneNode(true);
    newBookCard.querySelector('.book-title').textContent = book.title;
    newBookCard.querySelector('.book-author').textContent = book.author;
    newBookCard.querySelector('.book-pages').textContent = book.pages;
    newBookCard.querySelector('.book-status').textContent = book.read;

    const bookDeleteButton = newBookCard.querySelector('.book-delete');
    bookDeleteButton.addEventListener('click', () =>
      removeBookFromMylibrary(index)
    );

    const bookMarkAsRead = newBookCard.querySelector('.book-readed');
    bookMarkAsRead.addEventListener('click', () => markBookAsRead(index));
    container.appendChild(newBookCard);
  });
}

function addNewBook(book) {
  addBookToLibrary(book);
  renderMyLibrary();
}

//In case an element that is different from the last index is deleted, it will render the entire library
function removeBookFromMylibrary(index) {
  myLibrary.splice(index, 1);
  renderMyLibrary();
}

function markBookAsRead(index) {
  const book = myLibrary[index];
  book.read = book.read === 'Read' ? 'Not Read' : 'Read';
  renderMyLibrary();
}

const addBookButton = document.querySelector('.add-book-button');
const bookForm = document.getElementById('book-form');
addBookButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (bookForm.checkValidity()) {
    const title = document.getElementById('b-title').value;
    const author = document.getElementById('b-author').value;
    const pages = document.getElementById('b-n-pages').value;
    const read = document.getElementById('b-read-check').checked;

    const newBook = new Book(title, author, pages, read);
    addNewBook(newBook);

    bookForm.reset();
    showBookDialog(false);
  }
});

const book1 = new Book('The Metamorphosis', 'Franz Kafka', 64, true);
addNewBook(book1);
