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

addNewBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addNewBookToLibrary("The Hobbit 2", "J.R.R. Tolkien", 295, false);

// console.log(theHobbit.info());
displayBooks();
