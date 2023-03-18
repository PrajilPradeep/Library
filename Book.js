let myLibrary = [];

function Book(title, author, noOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.hasRead = hasRead;
}

// function to add book to the myLibrary array
function addNewBookToLibrary(title, author, noOfPages, hasRead) {
  //Removing spaces from the title
  let objName = title.replace(/\s+/g, "");
  objName = new Book(title, author, noOfPages, hasRead);
  myLibrary.push(objName);
}

// Adding function into the constructor to report book info
Book.prototype.info = function () {
  const readingStatus = this.hasRead ? "completed reading" : "not read yet";
  return (
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
  let libraryBookInfo = "";
  myLibrary.map((book) => (libraryBookInfo += book.info() + "<br>"));
  bookInfoElement.innerHTML = libraryBookInfo;
}

addNewBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addNewBookToLibrary("The Hobbit 2", "J.R.R. Tolkien", 295, false);

// console.log(theHobbit.info());
displayBooks();

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
    addNewBookForm.classList.remove("visible");
  }
});
