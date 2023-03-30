let myLibrary = [];
let bookId = 0;
displayBooks();

function Book(title, author, noOfPages, hasRead) {
  this.bookId = bookId;
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.hasRead = hasRead;
}

//function to toggle read status

Book.prototype.toggleReadStatus = (book) => {
  book.hasRead = !book.hasRead;
  //update reading status on card
  const bookCard = document.getElementById(`book-${book.bookId}`);
  const readingStausLabel = bookCard.querySelector(".reading-status");
  readingStausLabel.textContent = `Status: ${book.hasRead ? "Read" : "Unread"}`;
  const readingStatusButtonLable = bookCard.querySelector(
    ".reading-status-toggle-button"
  );
  readingStatusButtonLable.textContent = `${book.hasRead ? "Unread" : "Read"}`;
};

// function to add book to the myLibrary array
function addNewBookToLibrary(title, author, noOfPages, hasRead) {
  bookId++;
  objName = new Book(title, author, noOfPages, hasRead);
  myLibrary.push(objName);
  makeCardForBook(objName);
}

// Adding function into the constructor to report book info
Book.prototype.info = function () {
  const readingStatus = this.hasRead ? "Read" : "Unread";
  return (
    "book Id: " +
    `${this.bookId} ,` +
    this.title +
    " by " +
    this.author +
    ", " +
    this.noOfPages +
    " pages, " +
    readingStatus
  );
};

// Fetching element to display the book info
const bookInfoElement = document.querySelector(".book-info");

function displayBooks() {
  myLibrary.forEach((book) => makeCardForBook(book));
}

addNewBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addNewBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, false);
addNewBookToLibrary("To Kill a Mockingbird", "Harper Lee", 324, false);
addNewBookToLibrary("Pride and Prejudice", "Jane Austen", 432, true);
addNewBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 224, true);
addNewBookToLibrary(
  "One Hundred Years of Solitude",
  "Gabriel Garcia Marquez",
  417,
  true
);

const addNewBookBtn = document.querySelector(".add-book");
const addNewBookForm = document.querySelector(".add-new-book-form");
addNewBookBtn.addEventListener("click", () => {
  addNewBookForm.classList.add("visible");
});

//Make the form disappear if user clicks on the empty space.

document.addEventListener("click", (event) => {
  if (
    !addNewBookBtn.contains(event.target) &&
    !addNewBookForm.contains(event.target)
  ) {
    resetAddNewBookForm();
    hideAddNewBookForm();
  }
});

function hideAddNewBookForm() {
  addNewBookForm.classList.remove("visible");
}

function resetAddNewBookForm() {
  addNewBookForm.reset();
}

// To submit the book details through form

addNewBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //creating a new form object
  const addBookFormData = new FormData(addNewBookForm);
  let title = addBookFormData.get("book_title");
  let author = addBookFormData.get("book_author");
  let noOfPages = addBookFormData.get("no_of_pages");
  let hasRead = addBookFormData.get("reading_status") === "on";

  addNewBookToLibrary(title, author, noOfPages, hasRead);
  resetAddNewBookForm();
  hideAddNewBookForm();
  updateBookCount();
});

//Make Card for each book
function makeCardForBook(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", `book-${book.bookId}`);

  const title = document.createElement("h2");
  title.textContent = book.title;

  card.appendChild(title);

  const author = document.createElement("div");
  author.textContent = `Author: ${book.author}`;

  card.appendChild(author);

  const noOf_Pages = document.createElement("p");
  noOf_Pages.textContent = `Pages : ${book.noOfPages}`;

  card.appendChild(noOf_Pages);

  bookInfoElement.appendChild(card);

  const readStatus = book.hasRead ? "Read" : "Unread";
  const reading_status = document.createElement("p");
  reading_status.textContent = `Status: ${readStatus}`;
  reading_status.classList.add("reading-status");

  card.appendChild(reading_status);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button", "button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("id", `${book.bookId}`);
  card.appendChild(deleteButton);

  const readStatusUpdateButton = document.createElement("button");
  readStatusUpdateButton.classList.add(
    "reading-status-toggle-button",
    "button"
  );
  const readStatusButtonLabel = book.hasRead ? "Unread" : "Read";
  readStatusUpdateButton.textContent = `${readStatusButtonLabel}`;
  readStatusUpdateButton.setAttribute("book-id", `${book.bookId}`);
  card.appendChild(readStatusUpdateButton);
}

function updateBookCount() {
  let bookCount = Object.keys(myLibrary).length;
  // Set the data attribute of the book count span
  document.querySelector(".book-count-value").textContent = `${bookCount}`;
}
updateBookCount();

const deleteButtons = Array.from(document.querySelectorAll(".delete-button"));
deleteButtons.map((e) => {
  e.addEventListener("click", () => removeBook(e.id));
});

function removeBook(id) {
  //converting id to number
  id = parseInt(id);
  //removing fromt the myLibrary array
  myLibrary = myLibrary.filter((book) => book.bookId !== id);

  //removing card from screen
  const bookCard = document.getElementById(`book-${id}`);
  bookCard.remove();

  //update book count
  updateBookCount();
}

const readStatusUpdateButtons = Array.from(
  document.querySelectorAll(".reading-status-toggle-button")
);
readStatusUpdateButtons.map((button) => {
  button.addEventListener("click", () => {
    const selectedBookId = parseInt(button.getAttribute("book-id"));
    const book = myLibrary.find((book) => book.bookId === selectedBookId);
    //updating Reading Status
    book.toggleReadStatus(book);
  });
});
