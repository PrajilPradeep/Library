function Book(title, author, noOfPages, hasRead) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.hasRead = hasRead;
}

//Adding function into the constructor to report book info
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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.info());
